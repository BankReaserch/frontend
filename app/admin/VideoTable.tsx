"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Play,
  Download,
  Trash2,
  Search,
  Video as VideoIcon,
  Clock3,
  CalendarDays,
  UploadCloud,
  Loader2,
  Pencil,
} from "lucide-react";

import Modal from "@/components/utils/modal/FormModel";
interface VideoItem {
  _id: string;
  title: string;
  artist: string;
  category: string;
  series: string;
  filename: string;
  createdAt: string;
}

export default function VideoTable() {
  const [title, setTitle] =
    useState("");

  const [artist, setArtist] =
    useState("");

  const [videoData, setVideoData] =
    useState<VideoItem[]>([]);
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
  // PREVIEW (PLAY) MODAL STATE
  // =========================
  const [previewOpen, setPreviewOpen] =
    useState(false);

  const [previewVideo, setPreviewVideo] =
    useState<VideoItem | null>(null);

  // =========================
  // EDIT MODAL STATE
  // =========================
  const [editOpen, setEditOpen] =
    useState(false);

  const [editingVideo, setEditingVideo] =
    useState<VideoItem | null>(null);

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
  // FETCH VIDEOS
  // =========================
  const fetchVideos = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/video/all`,
        {
          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to fetch videos"
        );
      }

      setVideoData(
        data.videos || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // =========================
  // PREVIEW (PLAY VIDEO)
  // =========================
  const handleOpenPreview = (
    video: VideoItem
  ) => {
    setPreviewVideo(video);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewVideo(null);
  };

  // =========================
  // DELETE VIDEO
  // =========================
  const handleDelete = async (
    id: string
  ) => {
    const confirmed = confirm(
      "Delete this video?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/video/delete/${id}`,
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

      setVideoData((prev) =>
        prev.filter(
          (item) =>
            item._id !== id
        )
      );

      if (previewVideo?._id === id) {
        handleClosePreview();
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  // =========================
  // UPLOAD VIDEO
  // =========================
  const handleUpload = async () => {
    if (!selectedFile) {
      return alert(
        "Please select video file"
      );
    }

    if (!title.trim()) {
      return alert(
        "Please enter video title"
      );
    }

    try {
      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "video",
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
        `${process.env.NEXT_PUBLIC_API_URL}api/video/create`,
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

      await fetchVideos();

      alert(
        "Video uploaded successfully"
      );
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // EDIT VIDEO
  // =========================
  const handleEditOpen = (
    video: VideoItem
  ) => {
    // close preview player before editing
    handleClosePreview();

    setEditingVideo(video);
    setEditTitle(video.title);
    setEditArtist(video.artist);
    setEditCategory(
      video.category || "English"
    );
    setEditSeries(video.series || "");
    setEditFile(null);

    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditingVideo(null);
    setEditFile(null);
  };

  const handleEditSave = async () => {
    if (!editingVideo) return;

    if (!editTitle.trim()) {
      return alert(
        "Please enter video title"
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
          "video",
          editFile
        );
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/video/update/${editingVideo._id}`,
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

      await fetchVideos();

      handleEditClose();

      alert(
        "Video updated successfully"
      );
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSavingEdit(false);
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredVideos =
    videoData.filter((video) =>
      video.title
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
            Video Library
          </h2>

          <p className="text-[#8a9bb0] text-sm mt-1">
            Manage uploaded video
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
              placeholder="Search video..."
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
          placeholder="Video Name"
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
          htmlFor="video-upload"
          className="bg-white/[0.04] border border-dashed border-[#c9a84c]/30 rounded-xl px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-white/[0.06] transition"
        >
          <UploadCloud
            size={18}
            className="text-[#c9a84c]"
          />

          <span className="text-sm text-[#9db0c3] truncate">
            {selectedFile
              ? selectedFile.name
              : "Choose Video File"}
          </span>

          <input
            id="video-upload"
            type="file"
            accept="video/*"
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
              Upload Video
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
                Video
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
            ) : filteredVideos.length ===
              0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-[#8a9bb0]"
                >
                  No video found
                </td>
              </tr>
            ) : (
              filteredVideos.map(
                (video) => (
                  <tr
                    key={video._id}
                    className="border-b border-white/[0.04]"
                  >

                    {/* VIDEO */}
                    <td className="py-5">
                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center">
                          <VideoIcon
                            size={20}
                            className="text-[#c9a84c]"
                          />
                        </div>

                        <div>
                          <p className="text-white font-medium">
                            {
                              video.title
                            }
                          </p>

                          <p className="text-[#7f92a6] text-sm">
                            Video ID #
                            {
                              video._id
                            }
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* SPEAKER */}
                    <td className="py-5 text-white text-sm">
                      {
                        video.artist
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
                        video.category
                      }
                    </td>
                    <td className="py-5 text-white text-sm">
                      {
                        video.series || "Regular"
                      }
                    </td>

                    {/* DATE */}
                    <td className="py-5 text-[#9db0c3] text-sm">
                      <div className="flex items-center gap-2">

                        <CalendarDays
                          size={15}
                        />

                        {new Date(
                          video.createdAt
                        ).toLocaleDateString()}

                      </div>
                    </td>

                    {/* PLAYER */}
                    <td className="py-5">

                      <button
                        onClick={() =>
                          handleOpenPreview(
                            video
                          )
                        }
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20 hover:bg-[#c9a84c]/20"
                      >
                        <Play
                          size={16}
                        />
                        Play
                      </button>

                    </td>

                    {/* ACTIONS */}
                    <td className="py-5">

                      <div className="flex items-center justify-end gap-3">

                        {/* EDIT */}
                        <button
                          onClick={() =>
                            handleEditOpen(
                              video
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
                          href={`${process.env.NEXT_PUBLIC_API_URL}api/video/download/${video._id}`}
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
                              video._id
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

      {/* EDIT MODAL */}
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        title="Edit Video"
        description="Update the details for this video"
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
            placeholder="Video Name"
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
            htmlFor="edit-video-upload"
            className="sm:col-span-2 bg-gray-50 border border-dashed border-[#c9a84c]/40 rounded-xl px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-gray-100 transition"
          >
            <UploadCloud
              size={18}
              className="text-[#c9a84c]"
            />

            <span className="text-sm text-gray-500 truncate">
              {editFile
                ? editFile.name
                : "Replace video file (optional)"}
            </span>

            <input
              id="edit-video-upload"
              type="file"
              accept="video/*"
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

      {/* PREVIEW / PLAY MODAL */}
      <Modal
        open={previewOpen}
        onClose={handleClosePreview}
        title={previewVideo?.title}
        description={previewVideo?.artist}
        size="xl"
      >
        {previewVideo && (
          <div className="relative">
            <video
              key={previewVideo._id}
              src={`${process.env.NEXT_PUBLIC_API_URL}api/video/stream/${previewVideo._id}`}
              controls
              autoPlay
              className="w-full max-h-[70vh] rounded-xl bg-black"
            />
          </div>
        )}
      </Modal>

    </div>
  );
}