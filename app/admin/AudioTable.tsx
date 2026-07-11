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
  RotateCcw,
  RotateCw,
  Pencil,
} from "lucide-react";

import Modal from "@/components/utils/modal/FormModel";

interface AudioItem {
  _id: string;
  title: string;
  artist: string;
  category: string;
  series: string;
  filename: string;
  createdAt: string;
}

const SKIP_SECONDS = 10;

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

  // =========================
  // PLAYER PROGRESS STATE
  // =========================
  const [durations, setDurations] =
    useState<{ [key: string]: number }>({});

  const [currentTimes, setCurrentTimes] =
    useState<{ [key: string]: number }>({});

  const audioRefs = useRef<{
    [key: string]: HTMLAudioElement | null;
  }>({});

  // =========================
  // EDIT MODAL STATE
  // =========================
  const [editOpen, setEditOpen] =
    useState(false);

  const [editingAudio, setEditingAudio] =
    useState<AudioItem | null>(null);

  const [editTitle, setEditTitle] =
    useState("");

  const [editArtist, setEditArtist] =
    useState("");

  const [editCategory, setEditCategory] =
    useState("English");

  const [editSeries, setEditSeries] =
    useState("");

  const [editFile, setEditFile] =
    useState<File | null>(null);

  const [savingEdit, setSavingEdit] =
    useState(false);

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
  // TIME FORMAT
  // =========================
  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return "00:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

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
  // SKIP (REWIND / FAST-FORWARD)
  // =========================
  const skip = (
    id: string,
    delta: number
  ) => {
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
  // SEEK (CLICK PROGRESS BAR)
  // =========================
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

      if (editingAudio?._id === id) {
        handleEditClose();
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  // =========================
  // EDIT AUDIO
  // =========================
  const handleEditOpen = (
    audio: AudioItem
  ) => {
    // stop playback before editing
    const currentAudio =
      audioRefs.current[audio._id];

    if (currentAudio) {
      currentAudio.pause();
    }

    if (playingId === audio._id) {
      setPlayingId(null);
    }

    setEditingAudio(audio);
    setEditTitle(audio.title);
    setEditArtist(audio.artist);
    setEditCategory(
      audio.category || "English"
    );
    setEditSeries(audio.series || "");
    setEditFile(null);

    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingAudio(null);
    setEditFile(null);
  };

  const handleEditSave = async () => {
    if (!editingAudio) return;

    if (!editTitle.trim()) {
      return alert(
        "Please enter audio title"
      );
    }

    try {
      setSavingEdit(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        editTitle
      );

      formData.append(
        "artist",
        editArtist
      );

      formData.append(
        "category",
        editCategory
      );

      formData.append(
        "series",
        editSeries
      );

      if (editFile) {
        formData.append(
          "audio",
          editFile
        );
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/audio/${editingAudio._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Update failed"
        );
      }

      await fetchAudios();

      handleEditClose();

      alert(
        "Audio updated successfully"
      );
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSavingEdit(false);
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
          <div className="relative w-full lg:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f8296]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search audio..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-11 py-3 text-white placeholder:text-[#6f8296] focus:outline-none focus:border-[#c9a84c]/50"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[#8a9bb0] hover:text-white hover:bg-white/10 transition"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

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

        <table className="w-full min-w-[1000px]">

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
                  colSpan={8}
                  className="py-10 text-center text-[#8a9bb0]"
                >
                  Loading...
                </td>
              </tr>
            ) : filteredAudios.length ===
              0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-[#8a9bb0]"
                >
                  No audio found
                </td>
              </tr>
            ) : (
              filteredAudios.map(
                (audio) => {

                  const isPlaying =
                    playingId === audio._id;

                  const duration =
                    durations[audio._id] || 0;

                  const currentTime =
                    currentTimes[audio._id] || 0;

                  const progress =
                    duration > 0
                      ? (currentTime / duration) * 100
                      : 0;

                  return (
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
                        {formatTime(duration)}
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
                        onEnded={() =>
                          setPlayingId(
                            null
                          )
                        }
                      />

                      <div className="w-56">

                        <div className="flex items-center gap-1.5">

                          {/* REWIND 10s */}
                          <button
                            onClick={() => skip(audio._id, -SKIP_SECONDS)}
                            title="Back 10s"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9db0c3] hover:text-white hover:bg-white/10 transition"
                          >
                            <RotateCcw size={15} />
                          </button>

                          {/* PLAY / PAUSE */}
                          <button
                            onClick={() =>
                              handlePlayPause(
                                audio._id
                              )
                            }
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${isPlaying
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20"
                              }`}
                          >
                            {isPlaying ? (
                              <Pause
                                size={14}
                              />
                            ) : (
                              <Play
                                size={14}
                              />
                            )}

                            {isPlaying
                              ? "Pause"
                              : "Play"}
                          </button>

                          {/* FAST-FORWARD 10s */}
                          <button
                            onClick={() => skip(audio._id, SKIP_SECONDS)}
                            title="Forward 10s"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9db0c3] hover:text-white hover:bg-white/10 transition"
                          >
                            <RotateCw size={15} />
                          </button>

                        </div>

                        {/* TIME + PROGRESS */}
                        <div className="mt-2">

                          <div className="flex items-center justify-between text-[10px] text-[#7f92a6] mb-1">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                          </div>

                          <div
                            onClick={(e) => seekAudio(e, audio._id)}
                            className="relative h-1.5 bg-white/10 rounded-full cursor-pointer group"
                          >
                            <div
                              style={{ width: `${progress}%` }}
                              className="absolute top-0 left-0 h-full bg-[#c9a84c] rounded-full transition-all"
                            />

                            <div
                              style={{
                                left: `calc(${progress}% - 5px)`,
                              }}
                              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity shadow"
                            />
                          </div>

                        </div>

                      </div>

                    </td>

                    {/* ACTIONS */}
                    <td className="py-5">

                      <div className="flex items-center justify-end gap-3">

                        {/* EDIT */}
                        <button
                          onClick={() =>
                            handleEditOpen(
                              audio
                            )
                          }
                          className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/5 hover:bg-[#c9a84c]/10 flex items-center justify-center transition"
                        >
                          <Pencil
                            size={18}
                            className="text-[#c9a84c]"
                          />
                        </button>

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
                  );
                }
              )
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        title="Edit Audio"
        description="Update the details for this audio"
        size="md"
        footer={
          <>
            <button
              onClick={handleEditClose}
              disabled={savingEdit}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleEditSave}
              disabled={savingEdit}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#c9a84c] hover:bg-[#d4b567] text-[#0b1d2d] transition disabled:opacity-50 flex items-center gap-2"
            >
              {savingEdit ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* TITLE */}
          <input
            type="text"
            placeholder="Audio Name"
            value={editTitle}
            onChange={(e) =>
              setEditTitle(
                e.target.value
              )
            }
            className="sm:col-span-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#c9a84c]/60"
          />

          {/* ARTIST */}
          <input
            type="text"
            placeholder="Speaker / Artist"
            value={editArtist}
            onChange={(e) =>
              setEditArtist(
                e.target.value
              )
            }
            className="sm:col-span-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#c9a84c]/60"
          />

          {/* CATEGORY */}
          <select
            value={editCategory}
            onChange={(e) =>
              setEditCategory(
                e.target.value
              )
            }
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#c9a84c]/60"
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

          {/* SERIES */}
          <select
            value={editSeries}
            onChange={(e) =>
              setEditSeries(
                e.target.value
              )
            }
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#c9a84c]/60"
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

          {/* REPLACE FILE (optional) */}
          <label
            htmlFor="edit-audio-upload"
            className="sm:col-span-2 bg-gray-50 border border-dashed border-[#c9a84c]/40 rounded-xl px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-gray-100 transition"
          >
            <UploadCloud
              size={18}
              className="text-[#c9a84c]"
            />

            <span className="text-sm text-gray-500 truncate">
              {editFile
                ? editFile.name
                : "Replace audio file (optional)"}
            </span>

            <input
              id="edit-audio-upload"
              type="file"
              accept="audio/*"
              hidden
              onChange={(e) =>
                setEditFile(
                  e.target
                    .files?.[0] ||
                  null
                )
              }
            />
          </label>

        </div>
      </Modal>

    </div>
  );
}