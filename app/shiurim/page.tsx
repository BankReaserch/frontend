"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
    Download,
    Pause,
    Play,
    Search,
    X,
} from "lucide-react";
import {
    useEffect,
    useRef,
    useState,
} from "react";
import MediaLibraryPage from "./MediaLibraryPage";

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
          <MediaLibraryPage/>
        </>
    );
}