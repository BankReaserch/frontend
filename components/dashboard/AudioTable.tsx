"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Play,
  Pause,
  Download,
  Trash2,
  Search,
  Music2,
  Clock3,
  CalendarDays,
  UploadCloud,
  Loader2,
} from "lucide-react";

interface AudioItem {
  _id: string;
  title: string;
  artist: string;
  category: string;
  series: string;
  filename: string;
  createdAt: string;
}

export default function AudioTable() {
  const [playingId, setPlayingId] =
    useState<string | null>(null);

  const [title, setTitle] =
    useState("");

  const [artist, setArtist] =
    useState("");

  const [audioData, setAudioData] =
    useState<AudioItem[]>([]);
  const [category, setCategory] =
    useState("English");

  const [series, setSeries] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const audioRefs = useRef<{
    [key: string]: HTMLAudioElement | null;
  }>({});

  // =========================
  // FETCH AUDIOS
  // =========================
  const fetchAudios = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/audio`,
        {
          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to fetch audios"
        );
      }

      setAudioData(
        data.audios || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  // =========================
  // PLAY / PAUSE
  // =========================
  const handlePlayPause = async (
    id: string
  ) => {
    const currentAudio =
      audioRefs.current[id];

    if (!currentAudio) return;

    try {
      // pause all others
      Object.entries(
        audioRefs.current
      ).forEach(
        ([audioId, audio]) => {
          if (
            audioId !== id &&
            audio
          ) {
            audio.pause();
            audio.currentTime = 0;
          }
        }
      );

      if (playingId === id) {
        currentAudio.pause();

        setPlayingId(null);
      } else {
        await currentAudio.play();

        setPlayingId(id);
      }
    } catch (error) {
      console.error(
        "Audio playback error",
        error
      );
    }
  };

  // =========================
  // DELETE AUDIO
  // =========================
  const handleDelete = async (
    id: string
  ) => {
    const confirmed = confirm(
      "Delete this audio?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/audio/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Delete failed"
        );
      }

      setAudioData((prev) =>
        prev.filter(
          (item) =>
            item._id !== id
        )
      );
    } catch (error: any) {
      alert(error.message);
    }
  };

  // =========================
  // UPLOAD AUDIO
  // =========================
  const handleUpload = async () => {
    if (!selectedFile) {
      return alert(
        "Please select audio file"
      );
    }

    if (!title.trim()) {
      return alert(
        "Please enter audio title"
      );
    }

    try {
      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "audio",
        selectedFile
      );

      formData.append(
        "title",
        title
      );

      formData.append(
        "artist",
        artist
      );
      formData.append(
        "category",
        category
      );

      formData.append(
        "series",
        series
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/audio/upload`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Upload failed"
        );
      }

      setTitle("");
      setArtist("");
      setCategory("English");
      setSeries("");
      setSelectedFile(null);

      await fetchAudios();

      alert(
        "Audio uploaded successfully"
      );
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredAudios =
    audioData.filter((audio) =>
      audio.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="bg-[#0f2234] border border-white/5 rounded-3xl p-6 shadow-2xl">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-white text-2xl font-semibold">
            Audio Library
          </h2>

          <p className="text-[#8a9bb0] text-sm mt-1">
            Manage uploaded audio
            files
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full lg:w-80">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f8296]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search audio..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-[#6f8296] focus:outline-none focus:border-[#c9a84c]/50"
          />
        </div>
      </div>

      {/* UPLOAD */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-8">

        {/* TITLE */}
        <input
          type="text"
          placeholder="Audio Name"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white"
        />

        {/* ARTIST */}
        <input
          type="text"
          placeholder="Speaker / Artist"
          value={artist}
          onChange={(e) =>
            setArtist(
              e.target.value
            )
          }
          className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white"
        />
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white"
        >
          <option value="English">
            English
          </option>
          <option value="Hebrew">
            Hebrew
          </option>
          <option value="Yiddish">
            Yiddish
          </option>
        </select>
        <select
          value={series}
          onChange={(e) =>
            setSeries(e.target.value)
          }
          className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white"
        >
          <option value="">
            Regular Shiur
          </option>

          <option value="5 Minute English Series">
            5 Minute English Series
          </option>

          <option value="5 Minute Hebrew Series">
            5 Minute Hebrew Series
          </option>

          <option value="5 Minute Yiddish Series">
            5 Minute Yiddish Series
          </option>
        </select>
        {/* FILE */}
        <label
          htmlFor="audio-upload"
          className="bg-white/[0.04] border border-dashed border-[#c9a84c]/30 rounded-xl px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-white/[0.06] transition"
        >
          <UploadCloud
            size={18}
            className="text-[#c9a84c]"
          />

          <span className="text-sm text-[#9db0c3] truncate">
            {selectedFile
              ? selectedFile.name
              : "Choose Audio File"}
          </span>

          <input
            id="audio-upload"
            type="file"
            accept="audio/*"
            hidden
            onChange={(e) =>
              setSelectedFile(
                e.target
                  .files?.[0] ||
                null
              )
            }
          />
        </label>

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-[#c9a84c] hover:bg-[#d4b567] disabled:opacity-50 text-[#0b1d2d] rounded-xl font-semibold transition flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Uploading...
            </>
          ) : (
            <>
              <UploadCloud size={18} />
              Upload Audio
            </>
          )}
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead>
            <tr className="border-b border-white/5 text-left">

              <th className="pb-4 text-[#8a9bb0] text-sm">
                Audio
              </th>

              <th className="pb-4 text-[#8a9bb0] text-sm">
                Speaker
              </th>

              <th className="pb-4 text-[#8a9bb0] text-sm">
                Duration
              </th>
               <th className="pb-4 text-[#8a9bb0] text-sm">
                Category
              </th>
               <th className="pb-4 text-[#8a9bb0] text-sm">
                Series
              </th>

              <th className="pb-4 text-[#8a9bb0] text-sm">
                Uploaded
              </th>

              <th className="pb-4 text-[#8a9bb0] text-sm">
                Preview
              </th>

              <th className="pb-4 text-right text-[#8a9bb0] text-sm">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-[#8a9bb0]"
                >
                  Loading...
                </td>
              </tr>
            ) : filteredAudios.length ===
              0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-[#8a9bb0]"
                >
                  No audio found
                </td>
              </tr>
            ) : (
              filteredAudios.map(
                (audio) => (
                  <tr
                    key={audio._id}
                    className="border-b border-white/[0.04]"
                  >

                    {/* AUDIO */}
                    <td className="py-5">
                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center">
                          <Music2
                            size={20}
                            className="text-[#c9a84c]"
                          />
                        </div>

                        <div>
                          <p className="text-white font-medium">
                            {
                              audio.title
                            }
                          </p>

                          <p className="text-[#7f92a6] text-sm">
                            Audio ID #
                            {
                              audio._id
                            }
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* SPEAKER */}
                    <td className="py-5 text-white text-sm">
                      {
                        audio.artist
                      }
                    </td>

                    {/* DURATION */}
                    <td className="py-5 text-[#c9a84c] text-sm">
                      <div className="flex items-center gap-2">
                        <Clock3 size={15} />
                        --:--
                      </div>
                    </td>
                     <td className="py-5 text-white text-sm">
                      {
                        audio.category
                      }
                    </td>
                     <td className="py-5 text-white text-sm">
                      {
                        audio.series || "Regular"
                      }
                    </td>

                    {/* DATE */}
                    <td className="py-5 text-[#9db0c3] text-sm">
                      <div className="flex items-center gap-2">

                        <CalendarDays
                          size={15}
                        />

                        {new Date(
                          audio.createdAt
                        ).toLocaleDateString()}

                      </div>
                    </td>

                    {/* PLAYER */}
                    <td className="py-5">

                      <audio
                        ref={(el) => {
                          audioRefs.current[
                            audio._id
                          ] = el;
                        }}
                        src={`${process.env.NEXT_PUBLIC_API_URL}api/audio/stream/${audio._id}`}
                        preload="metadata"
                        onEnded={() =>
                          setPlayingId(
                            null
                          )
                        }
                      />

                      <button
                        onClick={() =>
                          handlePlayPause(
                            audio._id
                          )
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${playingId ===
                          audio._id
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20"
                          }`}
                      >
                        {playingId ===
                          audio._id ? (
                          <Pause
                            size={16}
                          />
                        ) : (
                          <Play
                            size={16}
                          />
                        )}

                        {playingId ===
                          audio._id
                          ? "Pause"
                          : "Play"}
                      </button>

                    </td>

                    {/* ACTIONS */}
                    <td className="py-5">

                      <div className="flex items-center justify-end gap-3">

                        {/* DOWNLOAD */}
                        <a
                          href={`${process.env.NEXT_PUBLIC_API_URL}api/audio/download/${audio._id}`}
                          className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/5 hover:bg-[#c9a84c]/10 flex items-center justify-center transition"
                        >
                          <Download
                            size={18}
                            className="text-[#c9a84c]"
                          />
                        </a>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            handleDelete(
                              audio._id
                            )
                          }
                          className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 flex items-center justify-center transition"
                        >
                          <Trash2
                            size={18}
                            className="text-red-400"
                          />
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}