"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
    Download,
    Pause,
    Play,
    Search,
} from "lucide-react";
import {
    useEffect,
    useRef,
    useState,
} from "react";

interface AudioType {
    _id: string;
    title: string;
    artist: string;
    category: string;
    series: string;
    createdAt: string;
}
export default function AudioPage() {

    const [search, setSearch] =
        useState("");
    const [selectedSeries, setSelectedSeries] =
        useState<string>("");
    const [audios, setAudios] =
        useState<AudioType[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [activeAudio, setActiveAudio] =
        useState<string | null>(
            null
        );
    const [currentTimes, setCurrentTimes] =
        useState<{
            [key: string]: number;
        }>({});

    const [durations, setDurations] =
        useState<{
            [key: string]: number;
        }>({});

    const audioRefs = useRef<{
        [key: string]:
        | HTMLAudioElement
        | null;
    }>({});

    // FETCH AUDIO
    useEffect(() => {

        const fetchAudios =
            async () => {

                try {

                    const response =
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}api/audio`
                        );

                    const data =
                        await response.json();

                    setAudios(
                        data.audios || []
                    );

                } catch (error) {

                    console.error(
                        "Audio fetch error:",
                        error
                    );

                } finally {

                    setLoading(false);

                }
            };

        fetchAudios();

    }, []);

    // PLAY / PAUSE
    const toggleAudio = async (
        id: string
    ) => {

        const current =
            audioRefs.current[id];

        if (!current) return;
        Object.keys(
            audioRefs.current
        ).forEach((key) => {

            const audio =
                audioRefs.current[key];

            if (
                key !== id &&
                audio
            ) {

                audio.pause();

            }
        });

        // TOGGLE
        if (activeAudio === id) {

            current.pause();

            setActiveAudio(null);

        } else {

            await current.play();

            setActiveAudio(id);

        }
    };

    const filtered = audios.filter((audio) => {
        const keyword = search.toLowerCase();

        const matchesSearch =
            audio.title?.toLowerCase().includes(keyword) ||
            audio.artist?.toLowerCase().includes(keyword) ||
            audio.category?.toLowerCase().includes(keyword);

        const matchesSeries =
            !selectedSeries ||
            audio.series === selectedSeries;

        return matchesSearch && matchesSeries;
    });
    const formatTime = (
        time: number
    ) => {

        if (!time)
            return "00:00";

        const minutes =
            Math.floor(
                time / 60
            );

        const seconds =
            Math.floor(
                time % 60
            );

        return `${minutes}:${String(
            seconds
        ).padStart(2, "0")}`;
    };
    const seekAudio = (
        e:
            React.MouseEvent<HTMLDivElement>,
        id: string
    ) => {

        const audio =
            audioRefs.current[id];

        if (!audio) return;

        const rect =
            e.currentTarget.getBoundingClientRect();

        const percent =
            (e.clientX -
                rect.left) /
            rect.width;

        audio.currentTime =
            percent *
            audio.duration;
    };
    return (
        <>
            <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
                <Navbar />
            </div>
            <div className="min-h-screen bg-[#f5f0e8] px-6 py-14">

                <div className="max-w-7xl mx-auto">

                    {/* HEADER */}
                    <div className="mb-10">

                        <h1 className="text-5xl font-serif text-[#0d1b2a]">

                            Audio Library

                        </h1>

                        <p className="text-[#6b7280] mt-3 max-w-2xl">

                            Browse Ribis
                            shiurim,
                            practical finance
                            lectures, and
                            educational
                            discussions.

                        </p>

                    </div>
                     <h2 className="text-2xl font-serif text-[#0d1b2a] mb-6">
                            Featured 5-Minute Series
                        </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                       
                        <button
                            onClick={() =>
                                setSelectedSeries("5 Minute English Series")
                            }
                            className="bg-[#0d1b2a] text-white rounded-2xl p-8 border border-[#1f3146] hover:scale-[1.02] transition"
                        >
                            <h3 className="text-3xl font-serif mb-4">
                                5-Minute English Series
                            </h3>

                            <div className="bg-[#c9a84c] text-[#0d1b2a] px-4 py-2 rounded-lg inline-block font-semibold">
                                View Series
                            </div>
                        </button>

                        <button
                            onClick={() =>
                                setSelectedSeries("5 Minute Hebrew Series")
                            }
                            className="bg-[#0d1b2a] text-white rounded-2xl p-8 border border-[#1f3146] hover:scale-[1.02] transition"
                        >
                            <h3 className="text-3xl font-serif mb-4">
                                5-Minute Hebrew Series
                            </h3>

                            <div className="bg-[#c9a84c] text-[#0d1b2a] px-4 py-2 rounded-lg inline-block font-semibold">
                                View Series
                            </div>
                        </button>

                        <button
                            onClick={() =>
                                setSelectedSeries("5 Minute Yiddish Series")
                            }
                            className="bg-[#0d1b2a] text-white rounded-2xl p-8 border border-[#1f3146] hover:scale-[1.02] transition"
                        >
                            <h3 className="text-3xl font-serif mb-4">
                                5-Minute Yiddish Series
                            </h3>

                            <div className="bg-[#c9a84c] text-[#0d1b2a] px-4 py-2 rounded-lg inline-block font-semibold">
                                View Series
                            </div>
                        </button>
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

                    </div>

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
                                placeholder="Search shiurim..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className="w-full h-14 rounded-xl border border-[#d9d2c6] bg-white pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#c9a84c]"
                            />

                        </div>

                        {/* CATEGORY */}
                        <select className="h-14 px-5 rounded-xl border border-[#d9d2c6] bg-white outline-none focus:ring-2 focus:ring-[#c9a84c]">
                            <option>All Categories</option>
                            <option>English</option>
                            <option>Yiddish</option>
                            <option>Hebrew</option>

                            {[...new Set(
                                audios.map(
                                    (audio) =>
                                        audio.category
                                )
                            )].map(
                                (category) => (

                                    <option
                                        key={category}
                                    >

                                        {category}

                                    </option>

                                )
                            )}

                        </select>

                    </div>

                    {/* LOADING */}
                    {loading ? (

                        <div className="text-center py-20 text-[#6b7280]">

                            Loading audio...

                        </div>

                    ) : (

                        <>
                            {/* AUDIO GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

                                {filtered.map(
                                    (audio) => {

                                        const isPlaying =
                                            activeAudio ===
                                            audio._id;

                                        return (
                                            <div
                                                key={
                                                    audio._id
                                                }
                                                className="bg-[#0d1b2a] rounded-2xl overflow-hidden border border-[#1f3146] shadow-sm hover:shadow-xl transition"
                                            >

                                                {/* CONTENT */}
                                                <div className="p-7">

                                                    {/* CATEGORY */}
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
                                                    {/* TITLE */}
                                                    <h2 className="text-2xl font-serif text-white leading-snug min-h-[72px]">

                                                        {
                                                            audio.title
                                                        }

                                                    </h2>

                                                    {/* SPEAKER */}
                                                    <p className="text-[#8a9bb0] text-sm mt-3">

                                                        {
                                                            audio.artist
                                                        }

                                                    </p>

                                                    {/* PLAYER */}
                                                    {/* PLAYER */}
                                                    <div className="flex items-center gap-4 mt-8">

                                                        {/* PLAY BUTTON */}
                                                        <button
                                                            onClick={() =>
                                                                toggleAudio(
                                                                    audio._id
                                                                )
                                                            }
                                                            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isPlaying
                                                                ? "bg-[#c9a84c] scale-105"
                                                                : "bg-[#f5f0e8] hover:scale-105"
                                                                }`}
                                                        >

                                                            {isPlaying ? (

                                                                <Pause
                                                                    className="text-[#0d1b2a]"
                                                                    size={22}
                                                                />

                                                            ) : (

                                                                <Play
                                                                    className="text-[#0d1b2a] ml-1"
                                                                    size={22}
                                                                />

                                                            )}

                                                        </button>

                                                        {/* PLAYER RIGHT */}
                                                        <div className="flex-1">

                                                            {/* AUDIO */}
                                                            <audio
                                                                ref={(el) => {

                                                                    audioRefs.current[
                                                                        audio._id
                                                                    ] = el;

                                                                }}
                                                                src={`${process.env.NEXT_PUBLIC_API_URL}api/audio/stream/${audio._id}`}
                                                                preload="metadata"

                                                                onLoadedMetadata={(
                                                                    e
                                                                ) => {

                                                                    const target =
                                                                        e.currentTarget;

                                                                    setDurations(
                                                                        (prev) => ({
                                                                            ...prev,

                                                                            [audio._id]:
                                                                                target.duration,
                                                                        })
                                                                    );

                                                                }}

                                                                onTimeUpdate={(
                                                                    e
                                                                ) => {

                                                                    const target =
                                                                        e.currentTarget;

                                                                    setCurrentTimes(
                                                                        (prev) => ({
                                                                            ...prev,

                                                                            [audio._id]:
                                                                                target.currentTime,
                                                                        })
                                                                    );

                                                                }}

                                                                onEnded={() =>
                                                                    setActiveAudio(
                                                                        null
                                                                    )
                                                                }
                                                            />

                                                            {/* TIME */}
                                                            <div className="flex items-center justify-between text-xs text-[#d7dce3] mb-2">

                                                                <span>

                                                                    {formatTime(
                                                                        currentTimes[
                                                                        audio._id
                                                                        ] || 0
                                                                    )}

                                                                </span>

                                                                <span>

                                                                    {formatTime(
                                                                        durations[
                                                                        audio._id
                                                                        ] || 0
                                                                    )}

                                                                </span>

                                                            </div>

                                                            {/* PROGRESS BAR */}
                                                            <div
                                                                onClick={(e) =>
                                                                    seekAudio(
                                                                        e,
                                                                        audio._id
                                                                    )
                                                                }
                                                                className="relative h-2 bg-white/10 rounded-full cursor-pointer group"
                                                            >

                                                                {/* ACTIVE BAR */}
                                                                <div
                                                                    style={{
                                                                        width: `${((currentTimes[
                                                                            audio._id
                                                                        ] || 0) /
                                                                            (durations[
                                                                                audio._id
                                                                            ] || 1)) *
                                                                            100
                                                                            }%`,
                                                                    }}
                                                                    className="absolute top-0 left-0 h-full bg-[#c9a84c] rounded-full transition-all"
                                                                />

                                                                {/* SEEK KNOB */}
                                                                <div
                                                                    style={{
                                                                        left: `calc(${((currentTimes[
                                                                            audio._id
                                                                        ] || 0) /
                                                                            (durations[
                                                                                audio._id
                                                                            ] || 1)) *
                                                                            100
                                                                            }% - 8px)`,
                                                                    }}
                                                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                                                />

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                                {/* FOOTER */}
                                                <div className="border-t border-white/10 px-7 py-5 flex items-center justify-between">

                                                    <div>

                                                        <p className="text-xs text-[#8a9bb0]">

                                                            Uploaded

                                                        </p>

                                                        <p className="text-sm text-white mt-1">

                                                            {new Date(
                                                                audio.createdAt
                                                            ).toLocaleDateString()}

                                                        </p>

                                                    </div>

                                                    <a
                                                        href={`${process.env.NEXT_PUBLIC_API_URL}api/audio/download/${audio._id}`}
                                                        className="flex items-center gap-2 bg-[#c9a84c] text-[#0d1b2a] px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
                                                    >

                                                        <Download
                                                            size={16}
                                                        />

                                                        Download

                                                    </a>

                                                </div>

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                            {/* EMPTY */}
                            {filtered.length ===
                                0 && (

                                    <div className="text-center py-20 text-[#6b7280]">

                                        No audio found

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