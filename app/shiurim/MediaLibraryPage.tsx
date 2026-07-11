"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
    Download,
    Headphones,
    Lock,
    Pause,
    Play,
    RotateCcw,
    RotateCw,
    Search,
    Video as VideoIcon,
    X,
} from "lucide-react";
import {
    useEffect,
    useRef,
    useState,
} from "react";

type MediaTab = "audio" | "video";

interface MediaType {
    _id: string;
    title: string;
    artist: string;
    category: string;
    series: string;
    createdAt: string;
}

const SKIP_SECONDS = 10;

export default function MediaLibraryPage() {

    // =========================
    // TAB
    // =========================
    const [activeTab, setActiveTab] =
        useState<MediaTab>("audio");

    // =========================
    // SHARED FILTERS
    // =========================
    const [search, setSearch] =
        useState("");
    const [selectedSeries, setSelectedSeries] =
        useState<string>("");
    const [selectedCategory, setSelectedCategory] =
        useState<string>("");

    // =========================
    // DATA
    // =========================
    const [audios, setAudios] =
        useState<MediaType[]>([]);
    const [videos, setVideos] =
        useState<MediaType[]>([]);

    const [audioLoading, setAudioLoading] =
        useState(true);
    const [videoLoading, setVideoLoading] =
        useState(true);

    // =========================
    // AUDIO PLAYER STATE
    // =========================
    const [activeAudio, setActiveAudio] =
        useState<string | null>(null);

    const [currentTimes, setCurrentTimes] =
        useState<{ [key: string]: number }>({});

    const [durations, setDurations] =
        useState<{ [key: string]: number }>({});

    const audioRefs = useRef<{
        [key: string]: HTMLAudioElement | null;
    }>({});

    // =========================
    // VIDEO PLAYER STATE
    // =========================
    const [activeVideo, setActiveVideo] =
        useState<string | null>(null);

    const videoRefs = useRef<{
        [key: string]: HTMLVideoElement | null;
    }>({});

    // =========================
    // FETCH AUDIO
    // =========================
    useEffect(() => {

        const fetchAudios = async () => {

            try {

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}api/audio`
                );

                const data = await response.json();

                setAudios(data.audios || []);

            } catch (error) {

                console.error("Audio fetch error:", error);

            } finally {

                setAudioLoading(false);

            }
        };

        fetchAudios();

    }, []);

    // =========================
    // FETCH VIDEO
    // =========================
    useEffect(() => {

        const fetchVideos = async () => {

            try {

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}api/video/all`
                );

                const data = await response.json();

                setVideos(data.videos || []);

            } catch (error) {

                console.error("Video fetch error:", error);

            } finally {

                setVideoLoading(false);

            }
        };

        fetchVideos();

    }, []);

    // =========================
    // PAUSE EVERYTHING (cross-media exclusivity)
    // =========================
    const pauseAllAudio = () => {
        Object.values(audioRefs.current).forEach((audio) => {
            if (audio) audio.pause();
        });
    };

    const pauseAllVideo = () => {
        Object.values(videoRefs.current).forEach((video) => {
            if (video) video.pause();
        });
    };

    // AUDIO PLAY / PAUSE
    const toggleAudio = async (id: string) => {

        const current = audioRefs.current[id];

        if (!current) return;

        Object.keys(audioRefs.current).forEach((key) => {
            const audio = audioRefs.current[key];
            if (key !== id && audio) audio.pause();
        });

        if (activeAudio === id) {

            current.pause();
            setActiveAudio(null);

        } else {

            pauseAllVideo();
            setActiveVideo(null);

            await current.play();
            setActiveAudio(id);

        }
    };

    // VIDEO PLAY (native controls fire onPlay)
    const handleVideoPlay = (id: string) => {

        Object.keys(videoRefs.current).forEach((key) => {
            const video = videoRefs.current[key];
            if (key !== id && video) video.pause();
        });

        pauseAllAudio();
        setActiveAudio(null);

        setActiveVideo(id);
    };

    const formatTime = (time: number) => {

        if (!time) return "00:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${String(seconds).padStart(2, "0")}`;
    };

    const seekAudio = (
        e: React.MouseEvent<HTMLDivElement>,
        id: string
    ) => {

        const audio = audioRefs.current[id];

        if (!audio || !isFinite(audio.duration)) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;

        audio.currentTime = percent * audio.duration;

        setCurrentTimes((prev) => ({
            ...prev,
            [id]: audio.currentTime,
        }));
    };

    // REWIND / FAST-FORWARD
    const skipAudio = (id: string, delta: number) => {

        const audio = audioRefs.current[id];

        if (!audio || !isFinite(audio.duration)) return;

        audio.currentTime = Math.min(
            Math.max(audio.currentTime + delta, 0),
            audio.duration
        );

        setCurrentTimes((prev) => ({
            ...prev,
            [id]: audio.currentTime,
        }));
    };

    // =========================
    // ACTIVE DATASET
    // =========================
    const dataset = activeTab === "audio" ? audios : videos;
    const loading = activeTab === "audio" ? audioLoading : videoLoading;

    const categories = [
        ...new Set(dataset.map((item) => item.category)),
    ].filter(Boolean);

    const filtered = dataset.filter((item) => {
        const keyword = search.toLowerCase();

        const matchesSearch =
            item.title?.toLowerCase().includes(keyword) ||
            item.artist?.toLowerCase().includes(keyword) ||
            item.category?.toLowerCase().includes(keyword);

        const matchesSeries =
            !selectedSeries || item.series === selectedSeries;

        const matchesCategory =
            !selectedCategory || item.category === selectedCategory;

        return matchesSearch && matchesSeries && matchesCategory;
    });

    const handleTabChange = (tab: MediaTab) => {
        setActiveTab(tab);
        setSelectedCategory("");
    };

    return (
        <>
            <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
                <Navbar />
            </div>
            <div className="min-h-screen bg-[#f5f0e8] px-6 py-14">

                <div className="max-w-7xl mx-auto">

                    {/* HEADER */}
                    <div className="mb-8">

                        <h1 className="text-5xl font-serif text-[#0d1b2a]">
                            Media Library
                        </h1>

                        <p className="text-[#6b7280] mt-3 max-w-2xl">
                            Listen to and watch Ribis shiurim,
                            practical finance lectures, and
                            educational discussions.
                        </p>

                    </div>

                    {/* TAB SWITCHER */}
                    <div className="inline-flex bg-white border border-[#d9d2c6] rounded-full p-1.5 mb-10 shadow-sm">

                        <button
                            onClick={() => handleTabChange("audio")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "audio"
                                ? "bg-[#0d1b2a] text-white shadow-md"
                                : "text-[#6b7280] hover:text-[#0d1b2a]"
                                }`}
                        >
                            <Headphones size={17} />
                            Audio
                        </button>

                        <button
                            onClick={() => handleTabChange("video")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "video"
                                ? "bg-[#0d1b2a] text-white shadow-md"
                                : "text-[#6b7280] hover:text-[#0d1b2a]"
                                }`}
                        >
                            <VideoIcon size={17} />
                            Video
                        </button>

                    </div>

                    {/* FEATURED SERIES */}
                    <h2 className="text-2xl font-serif text-[#0d1b2a] mb-6">
                        Featured 5-Minute {activeTab === "audio" ? "Audio" : "Video"} Series
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                        {[
                            {
                                label: "5-Minute English Series",
                                value: `5 Minute English Series`,
                            },
                            {
                                label: "5-Minute Hebrew Series",
                                value: `5 Minute Hebrew Series`,
                            },
                            {
                                label: "5-Minute Yiddish Series",
                                value: `5 Minute Yiddish Series`,
                            },
                        ].map((item) => (
                            <button
                                key={item.value}
                                onClick={() =>
                                    setSelectedSeries(
                                        selectedSeries === item.value
                                            ? ""
                                            : item.value
                                    )
                                }
                                className={`bg-[#0d1b2a] text-white rounded-2xl p-8 border transition hover:scale-[1.02] text-left ${selectedSeries === item.value
                                    ? "border-[#c9a84c]"
                                    : "border-[#1f3146]"
                                    }`}
                            >
                                <h3 className="text-3xl font-serif mb-4">
                                    {item.label}
                                </h3>

                                <div className="bg-[#c9a84c] text-[#0d1b2a] px-4 py-2 rounded-lg inline-block font-semibold">
                                    {selectedSeries === item.value
                                        ? "Viewing Series"
                                        : "View Series"}
                                </div>
                            </button>
                        ))}

                    </div>

                    {selectedSeries && (
                        <div className="mb-8">
                            <button
                                onClick={() => setSelectedSeries("")}
                                className="px-4 py-2 rounded-lg bg-[#0d1b2a] text-white hover:bg-[#13263b]"
                            >
                                ← Show All Shiurim
                            </button>
                        </div>
                    )}

                    {/* SEARCH + FILTER */}
                    <div className="flex flex-col md:flex-row gap-4 mb-10">

                        {/* SEARCH */}
                        <div className="relative flex-1">

                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a9bb0]"
                            />

                            <input
                                type="text"
                                placeholder={
                                    activeTab === "audio"
                                        ? "Search shiurim..."
                                        : "Search video shiurim..."
                                }
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-14 rounded-xl border border-[#d9d2c6] bg-white pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#c9a84c]"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                                    aria-label="Clear search"
                                >
                                    <X />
                                </button>
                            )}
                        </div>

                        {/* CATEGORY */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="h-14 px-5 rounded-xl border border-[#d9d2c6] bg-white outline-none focus:ring-2 focus:ring-[#c9a84c]"
                        >
                            <option value="">All Categories</option>

                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}

                        </select>

                    </div>

                    {/* LOADING */}
                    {loading ? (

                        <div className="text-center py-20 text-[#6b7280]">
                            Loading {activeTab}...
                        </div>

                    ) : (

                        <>
                            {activeTab === "audio" ? (

                                /* =========================
                                   AUDIO GRID
                                ========================= */
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

                                    {filtered.map((audio) => {

                                        const isPlaying = activeAudio === audio._id;

                                        return (
                                            <div
                                                key={audio._id}
                                                className="bg-[#0d1b2a] rounded-2xl overflow-hidden border border-[#1f3146] shadow-sm hover:shadow-xl transition"
                                            >

                                                <div className="p-7">

                                                    <div className="flex flex-wrap gap-2 mb-5">
                                                        <span className="inline-block text-xs bg-[#c9a84c]/15 text-[#c9a84c] px-3 py-1 rounded-full">
                                                            {audio.category}
                                                        </span>

                                                        {audio.series && (
                                                            <span className="inline-block text-xs bg-white/10 text-white px-3 py-1 rounded-full">
                                                                {audio.series}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h2 className="text-2xl font-serif text-white leading-snug min-h-[72px]">
                                                        {audio.title}
                                                    </h2>

                                                    <p className="text-[#8a9bb0] text-sm mt-3">
                                                        {audio.artist}
                                                    </p>

                                                    {/* PLAYER */}
                                                    <div className="flex items-center gap-3 mt-8">

                                                        {/* REWIND 10s */}
                                                        <button
                                                            onClick={() => skipAudio(audio._id, -SKIP_SECONDS)}
                                                            title="Back 10s"
                                                            className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-[#8a9bb0] hover:text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all"
                                                        >
                                                            <RotateCcw size={16} />
                                                        </button>

                                                        <button
                                                            onClick={() => toggleAudio(audio._id)}
                                                            className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${isPlaying
                                                                ? "bg-[#c9a84c] scale-105 shadow-[0_0_0_6px_rgba(201,168,76,0.15)]"
                                                                : "bg-[#f5f0e8] hover:scale-105"
                                                                }`}
                                                        >
                                                            {isPlaying ? (
                                                                <Pause className="text-[#0d1b2a]" size={22} />
                                                            ) : (
                                                                <Play className="text-[#0d1b2a] ml-1" size={22} />
                                                            )}
                                                        </button>

                                                        {/* FAST-FORWARD 10s */}
                                                        <button
                                                            onClick={() => skipAudio(audio._id, SKIP_SECONDS)}
                                                            title="Forward 10s"
                                                            className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-[#8a9bb0] hover:text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all"
                                                        >
                                                            <RotateCw size={16} />
                                                        </button>

                                                        <div className="flex-1 min-w-0">

                                                            <audio
                                                                ref={(el) => {
                                                                    audioRefs.current[audio._id] = el;
                                                                }}
                                                                src={`${process.env.NEXT_PUBLIC_API_URL}api/audio/stream/${audio._id}`}
                                                                preload="metadata"
                                                                onLoadedMetadata={(e) => {
                                                                    const target = e.currentTarget;
                                                                    setDurations((prev) => ({
                                                                        ...prev,
                                                                        [audio._id]: target.duration,
                                                                    }));
                                                                }}
                                                                onTimeUpdate={(e) => {
                                                                    const target = e.currentTarget;
                                                                    setCurrentTimes((prev) => ({
                                                                        ...prev,
                                                                        [audio._id]: target.currentTime,
                                                                    }));
                                                                }}
                                                                onEnded={() => setActiveAudio(null)}
                                                            />

                                                            <div className="flex items-center justify-between text-xs text-[#d7dce3] mb-2">
                                                                <span>
                                                                    {formatTime(currentTimes[audio._id] || 0)}
                                                                </span>
                                                                <span>
                                                                    {formatTime(durations[audio._id] || 0)}
                                                                </span>
                                                            </div>

                                                            <div
                                                                onClick={(e) => seekAudio(e, audio._id)}
                                                                className="relative h-2 bg-white/10 rounded-full cursor-pointer group"
                                                            >
                                                                <div
                                                                    style={{
                                                                        width: `${((currentTimes[audio._id] || 0) /
                                                                            (durations[audio._id] || 1)) *
                                                                            100
                                                                            }%`,
                                                                    }}
                                                                    className="absolute top-0 left-0 h-full bg-[#c9a84c] rounded-full transition-all"
                                                                />

                                                                <div
                                                                    style={{
                                                                        left: `calc(${((currentTimes[audio._id] || 0) /
                                                                            (durations[audio._id] || 1)) *
                                                                            100
                                                                            }% - 8px)`,
                                                                    }}
                                                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                                                />
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="border-t border-white/10 px-7 py-5 flex items-center justify-between">

                                                    <div>
                                                        <p className="text-xs text-[#8a9bb0]">Uploaded</p>
                                                        <p className="text-sm text-white mt-1">
                                                            {new Date(audio.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>

                                                    <a
                                                        href={`${process.env.NEXT_PUBLIC_API_URL}api/audio/download/${audio._id}`}
                                                        className="flex items-center gap-2 bg-[#c9a84c] text-[#0d1b2a] px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
                                                    >
                                                        <Download size={16} />
                                                        Download
                                                    </a>

                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>

                            ) : (

                                /* =========================
                                   VIDEO GRID
                                ========================= */
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

                                    {filtered.map((video) => {

                                        const isPlaying = activeVideo === video._id;

                                        return (
                                            <div
                                                key={video._id}
                                                className="bg-[#0d1b2a] rounded-2xl overflow-hidden border border-[#1f3146] shadow-sm hover:shadow-xl transition"
                                            >

                                                <div className="relative aspect-video bg-black">

                                                    <video
                                                        ref={(el) => {
                                                            videoRefs.current[video._id] = el;
                                                        }}
                                                        src={`${process.env.NEXT_PUBLIC_API_URL}api/video/stream/${video._id}`}
                                                        controls
                                                        controlsList="nodownload noremoteplayback noplaybackrate"
                                                        disablePictureInPicture
                                                        disableRemotePlayback
                                                        onContextMenu={(e) => e.preventDefault()}
                                                        preload="metadata"
                                                        className="w-full h-full object-contain bg-black"
                                                        onPlay={() => handleVideoPlay(video._id)}
                                                        onEnded={() => setActiveVideo(null)}
                                                    />

                                                    {!isPlaying && (
                                                        <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full pointer-events-none">
                                                            <VideoIcon size={14} className="text-[#c9a84c]" />
                                                            <span className="text-xs text-white">Video</span>
                                                        </div>
                                                    )}

                                                </div>

                                                <div className="p-7">

                                                    <div className="flex flex-wrap gap-2 mb-5">
                                                        <span className="inline-block text-xs bg-[#c9a84c]/15 text-[#c9a84c] px-3 py-1 rounded-full">
                                                            {video.category}
                                                        </span>

                                                        {video.series && (
                                                            <span className="inline-block text-xs bg-white/10 text-white px-3 py-1 rounded-full">
                                                                {video.series}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h2 className="text-2xl font-serif text-white leading-snug min-h-[72px]">
                                                        {video.title}
                                                    </h2>

                                                    <p className="text-[#8a9bb0] text-sm mt-3">
                                                        {video.artist}
                                                    </p>

                                                </div>

                                                <div className="border-t border-white/10 px-7 py-5 flex items-center justify-between">

                                                    <div>
                                                        <p className="text-xs text-[#8a9bb0]">Uploaded</p>
                                                        <p className="text-sm text-white mt-1">
                                                            {new Date(video.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-[#8a9bb0] text-xs">
                                                        <Lock size={14} />
                                                        Streaming only
                                                    </div>

                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>

                            )}

                            {/* EMPTY */}
                            {filtered.length === 0 && (
                                <div className="text-center py-20 text-[#6b7280]">
                                    No {activeTab} found
                                </div>
                            )}
                        </>
                    )}

                </div>

            </div>
            <Footer />
        </>
    );
}