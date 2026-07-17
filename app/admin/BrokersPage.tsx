"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Building2,
  Globe,
  Home,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  ShieldCheck,
  Trash2,
  UploadCloud,
} from "lucide-react";

import Modal from "@/components/utils/modal/FormModel";

type MortgageType =
  | "Residential"
  | "Commercial"
  | "Both";

type KosherStatus =
  | "Totally Kosher"
  | "Offers Kosher Line";

type Broker = {
  _id: string;

  name: string;

  location: string;

  info: string;

  phone: string;

  email: string;

  website: string;

  mortgageType: MortgageType;

  kosherStatus: KosherStatus;

  kosherLine?: string;

  logoUrl?: string;
};

const initialForm = {
  name: "",

  location: "",

  info: "",

  phone: "",

  email: "",

  website: "",

  mortgageType:
    "Residential" as MortgageType,

  kosherStatus:
    "Totally Kosher" as KosherStatus,

  kosherLine: "",
};

export default function AdminBrokersPage() {

  const [brokers, setBrokers] =
    useState<Broker[]>(
      []
    );

  const [loading, setLoading] =
    useState(true);

  const [open, setOpen] =
    useState(false);

  const [editingBroker, setEditingBroker] =
    useState<Broker | null>(
      null
    );

  const [form, setForm] =
    useState(
      initialForm
    );

  const [logoFile, setLogoFile] =
    useState<File | null>(
      null
    );

  const [logoPreview, setLogoPreview] =
    useState<string>("");

  const [saving, setSaving] =
    useState(false);

  /*
  ========================================
  FETCH
  ========================================
  */

  useEffect(() => {

    fetchBrokers();

  }, []);

  const fetchBrokers =
    async () => {

      try {

        const res =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}api/brokers/all`,
            {
              withCredentials: true,
            }
          );

        setBrokers(
          res.data.data || []
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLoading(false);

      }
    };

  /*
  ========================================
  HANDLE CHANGE
  ========================================
  */

  const handleChange =
    (
      e: React.ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
      >
    ) => {

      setForm({
        ...form,

        [e.target.name]:
          e.target.value,
      });
    };

  /*
  ========================================
  HANDLE LOGO
  ========================================
  */

  const handleLogoChange =
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        e.target.files?.[0] || null;

      setLogoFile(file);

      setLogoPreview(
        file
          ? URL.createObjectURL(file)
          : ""
      );
    };

  /*
  ========================================
  OPEN CREATE
  ========================================
  */

  const openCreate =
    () => {

      setEditingBroker(
        null
      );

      setForm(
        initialForm
      );

      setLogoFile(null);
      setLogoPreview("");

      setOpen(true);
    };

  /*
  ========================================
  OPEN EDIT
  ========================================
  */

  const openEdit =
    (
      broker: Broker
    ) => {

      setEditingBroker(
        broker
      );

      setForm({
        name:
          broker.name,

        location:
          broker.location,

        info:
          broker.info,

        phone:
          broker.phone,

        email:
          broker.email || "",

        website:
          broker.website,

        mortgageType:
          broker.mortgageType ||
          "Residential",

        kosherStatus:
          broker.kosherStatus ||
          "Totally Kosher",

        kosherLine:
          broker.kosherLine || "",
      });

      setLogoFile(null);
      setLogoPreview(
        broker.logoUrl || ""
      );

      setOpen(true);
    };

  /*
  ========================================
  SUBMIT
  ========================================
  */

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
        form.kosherStatus ===
          "Offers Kosher Line" &&
        !form.kosherLine.trim()
      ) {
        alert(
          "Please specify the kosher line offered"
        );
        return;
      }

      try {

        setSaving(true);

        const payload =
          new FormData();

        payload.append(
          "name",
          form.name
        );

        payload.append(
          "location",
          form.location
        );

        payload.append(
          "info",
          form.info
        );

        payload.append(
          "phone",
          form.phone
        );

        payload.append(
          "email",
          form.email
        );

        payload.append(
          "website",
          form.website
        );

        payload.append(
          "mortgageType",
          form.mortgageType
        );

        payload.append(
          "kosherStatus",
          form.kosherStatus
        );

        payload.append(
          "kosherLine",
          form.kosherStatus ===
            "Offers Kosher Line"
            ? form.kosherLine.trim()
            : ""
        );

        if (logoFile) {
          payload.append(
            "logo",
            logoFile
          );
        }

        if (
          editingBroker
        ) {

          await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}api/brokers/update/${editingBroker._id}`,
            payload,
            {
              withCredentials: true,
            }
          );

        } else {

          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}api/brokers/create`,
            payload,
            {
              withCredentials: true,
            }
          );
        }

        setOpen(false);

        fetchBrokers();

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setSaving(false);

      }
    };

  /*
  ========================================
  DELETE
  ========================================
  */

  const handleDelete =
    async (
      id: string
    ) => {

      const confirmDelete =
        confirm(
          "Delete this broker?"
        );

      if (
        !confirmDelete
      ) {
        return;
      }

      try {

        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}api/brokers/delete/${id}`,
          {
            withCredentials: true,
          }
        );

        fetchBrokers();

      } catch (error) {

        console.error(
          error
        );
      }
    };

  return (
    <main className="min-h-screen bg-[#f5f1ea]">

      {/* HEADER */}
      <section className="bg-white border border-[#ece4d8] rounded-[28px] p-7">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a21a] font-semibold">

              Admin Panel

            </p>

            <h1 className="font-serif text-5xl text-[#051933] mt-3">

              Brokers Management

            </h1>

            <p className="text-[#64748b] mt-3">

              Manage approved brokers and financial partners

            </p>

          </div>

          <button
            onClick={
              openCreate
            }
            className="h-12 px-6 rounded-2xl bg-[#051933] text-white flex items-center gap-2 hover:opacity-90 transition"
          >

            <Plus size={18} />

            Add Broker

          </button>

        </div>

      </section>

      {/* CONTENT */}
      <section className="mt-8">

        {loading ? (

          <div className="bg-white rounded-3xl p-10 text-center text-[#64748b]">

            Loading brokers...

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

            {brokers.map(
              (broker) => (

               <div
  key={broker._id}
  className="bg-white rounded-[30px] border border-[#ece4d8] p-7 h-[720px] flex flex-col shadow-[0_10px_30px_rgba(5,25,51,0.04)] hover:shadow-[0_20px_50px_rgba(5,25,51,0.08)] transition-all duration-300"
>

  {/* TOP */}
  <div className="flex items-start justify-between mb-6 flex-shrink-0">

    <div className="w-16 h-16 rounded-3xl bg-[#f8f4ec] flex items-center justify-center overflow-hidden">

      {broker.logoUrl ? (

        <img
          src={broker.logoUrl}
          alt={`${broker.name} logo`}
          className="w-full h-full object-cover"
        />

      ) : (

        <Building2
          size={30}
          className="text-[#c8a21a]"
        />

      )}

    </div>

    <div className="rounded-full bg-[#f8f5ef] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7b16]">

      Verified

    </div>

  </div>

  {/* NAME */}
  <div className="flex-shrink-0 min-h-[90px]">

    <h2 className="font-serif text-3xl leading-tight text-[#051933] break-words">

      {broker.name}

    </h2>

  </div>

  {/* BADGES */}
  <div className="flex flex-wrap gap-2 flex-shrink-0 mb-2">

    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#051933]/5 px-3 py-1.5 text-xs font-semibold text-[#051933]">

      <Home size={13} />

      {broker.mortgageType || "Residential"}

    </span>

    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
        broker.kosherStatus ===
        "Totally Kosher"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-[#fbf1d9] text-[#9b7b16]"
      }`}
    >

      <ShieldCheck size={13} />

      {broker.kosherStatus ===
      "Totally Kosher"
        ? "Totally Kosher"
        : broker.kosherLine
        ? `Kosher Line: ${broker.kosherLine}`
        : "Offers Kosher Line"}

    </span>

  </div>

  {/* SCROLLABLE INFO */}
  <div className="mt-4 flex-1 overflow-hidden">

    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">

      <p className="text-[#64748b] leading-8 text-[15px]">

        {broker.info}

      </p>

    </div>

  </div>

  {/* DETAILS */}
  <div className="space-y-5 mt-6 pt-6 border-t border-[#f1eadf] flex-shrink-0">

    {/* LOCATION */}
    <div className="flex items-start gap-4 min-h-[54px]">

      <MapPin
        size={18}
        className="text-[#c8a21a] mt-1 flex-shrink-0"
      />

      <div>

        <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">

          Location

        </p>

        <p className="text-[#051933] font-medium mt-1">

          {broker.location}

        </p>

      </div>

    </div>

    {/* PHONE */}
    <div className="flex items-start gap-4 min-h-[54px]">

      <Phone
        size={18}
        className="text-[#c8a21a] mt-1 flex-shrink-0"
      />

      <div>

        <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">

          Telephone

        </p>

        <p className="text-[#051933] font-medium mt-1">

          {broker.phone}

        </p>

      </div>

    </div>

    {/* EMAIL */}
    <div className="flex items-start gap-4 min-h-[54px]">

      <Mail
        size={18}
        className="text-[#c8a21a] mt-1 flex-shrink-0"
      />

      <div className="min-w-0">

        <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">

          Email

        </p>

        <a
          href={`mailto:${broker.email}`}
          className="text-[#051933] font-medium mt-1 hover:text-[#c8a21a] transition break-all inline-block"
        >

          {broker.email || "—"}

        </a>

      </div>

    </div>

    {/* WEBSITE */}
    <div className="flex items-start gap-4 min-h-[64px]">

      <Globe
        size={18}
        className="text-[#c8a21a] mt-1 flex-shrink-0"
      />

      <div className="min-w-0">

        <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">

          Website

        </p>

        <a
          href={`https://${broker.website.replace(
            /^https?:\/\//,
            ""
          )}`}
          target="_blank"
          rel="noreferrer"
          className="text-[#051933] font-medium mt-1 underline hover:text-[#c8a21a] transition break-all inline-block"
        >

          {broker.website}

        </a>

      </div>

    </div>

  </div>

  {/* ACTIONS */}
  <div className="flex items-center gap-3 mt-7 flex-shrink-0">

    <button
      onClick={() =>
        openEdit(
          broker
        )
      }
      className="flex-1 h-12 rounded-2xl bg-[#f8f4ec] border border-[#ece4d8] flex items-center justify-center gap-2 text-[#051933] hover:bg-[#f2ece2] transition"
    >

      <Pencil
        size={17}
      />

      Edit

    </button>

    <button
      onClick={() =>
        handleDelete(
          broker._id
        )
      }
      className="w-12 h-12 rounded-2xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition"
    >

      <Trash2
        size={18}
      />

    </button>

  </div>

</div>
              )
            )}

          </div>
        )}

      </section>

      {/* MODAL */}
      <Modal
        open={open}
        onClose={setOpen}
        title={
          editingBroker
            ? "Update Broker"
            : "Create Broker"
        }
        size="lg"
      >

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >

          {/* NAME */}
          <div>

            <label className="text-sm font-medium text-[#051933]">

              Broker Name

            </label>

            <input
              name="name"
              value={
                form.name
              }
              onChange={
                handleChange
              }
              required
              className="w-full h-12 rounded-xl border border-[#ece4d8] bg-[#faf8f4] px-4 mt-2 outline-none focus:ring-2 focus:ring-[#c8a21a]"
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="text-sm font-medium text-[#051933]">

              Email Address

            </label>

            <input
              type="email"
              name="email"
              value={
                form.email
              }
              onChange={
                handleChange
              }
              required
              placeholder="broker@example.com"
              className="w-full h-12 rounded-xl border border-[#ece4d8] bg-[#faf8f4] px-4 mt-2 outline-none focus:ring-2 focus:ring-[#c8a21a]"
            />

          </div>

          {/* LOCATION */}
          <div>

            <label className="text-sm font-medium text-[#051933]">

              Location

            </label>

            <input
              name="location"
              value={
                form.location
              }
              onChange={
                handleChange
              }
              required
              className="w-full h-12 rounded-xl border border-[#ece4d8] bg-[#faf8f4] px-4 mt-2 outline-none focus:ring-2 focus:ring-[#c8a21a]"
            />

          </div>

          {/* PHONE */}
          <div>

            <label className="text-sm font-medium text-[#051933]">

              Phone

            </label>

            <input
              name="phone"
              value={
                form.phone
              }
              onChange={
                handleChange
              }
              required
              className="w-full h-12 rounded-xl border border-[#ece4d8] bg-[#faf8f4] px-4 mt-2 outline-none focus:ring-2 focus:ring-[#c8a21a]"
            />

          </div>

          {/* WEBSITE */}
          <div>

            <label className="text-sm font-medium text-[#051933]">

              Website

            </label>

            <input
              name="website"
              value={
                form.website
              }
              onChange={
                handleChange
              }
              required
              className="w-full h-12 rounded-xl border border-[#ece4d8] bg-[#faf8f4] px-4 mt-2 outline-none focus:ring-2 focus:ring-[#c8a21a]"
            />

          </div>

          {/* MORTGAGE TYPE */}
          <div>

            <label className="text-sm font-medium text-[#051933]">

              Mortgage Type

            </label>

            <select
              name="mortgageType"
              value={
                form.mortgageType
              }
              onChange={
                handleChange
              }
              required
              className="w-full h-12 rounded-xl border border-[#ece4d8] bg-[#faf8f4] px-4 mt-2 outline-none focus:ring-2 focus:ring-[#c8a21a]"
            >

              <option value="Residential">

                Residential

              </option>

              <option value="Commercial">

                Commercial

              </option>

              <option value="Both">

                Both

              </option>

            </select>

          </div>

          {/* KOSHER STATUS */}
          <div>

            <label className="text-sm font-medium text-[#051933]">

              Kosher Status

            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    kosherStatus:
                      "Totally Kosher",
                    kosherLine: "",
                  })
                }
                className={`h-12 rounded-xl border text-sm font-medium transition ${
                  form.kosherStatus ===
                  "Totally Kosher"
                    ? "border-[#c8a21a] bg-[#fbf1d9] text-[#9b7b16]"
                    : "border-[#ece4d8] bg-[#faf8f4] text-[#64748b]"
                }`}
              >

                Totally Kosher

              </button>

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    kosherStatus:
                      "Offers Kosher Line",
                  })
                }
                className={`h-12 rounded-xl border text-sm font-medium transition ${
                  form.kosherStatus ===
                  "Offers Kosher Line"
                    ? "border-[#c8a21a] bg-[#fbf1d9] text-[#9b7b16]"
                    : "border-[#ece4d8] bg-[#faf8f4] text-[#64748b]"
                }`}
              >

                Offers a Kosher Line

              </button>

            </div>

            {form.kosherStatus ===
              "Offers Kosher Line" && (

              <input
                name="kosherLine"
                value={
                  form.kosherLine
                }
                onChange={
                  handleChange
                }
                required
                placeholder="Name of the kosher line offered"
                className="w-full h-12 rounded-xl border border-[#ece4d8] bg-[#faf8f4] px-4 mt-3 outline-none focus:ring-2 focus:ring-[#c8a21a]"
              />

            )}

          </div>

          {/* LOGO */}
          <div>

            <label className="text-sm font-medium text-[#051933]">

              Broker Logo

            </label>

            <label
              htmlFor="broker-logo"
              className="mt-2 flex items-center gap-4 border-2 border-dashed border-[#ece4d8] rounded-2xl p-4 cursor-pointer bg-[#faf8f4] hover:border-[#c8a21a] transition"
            >

              <div className="w-14 h-14 rounded-xl bg-white border border-[#ece4d8] flex items-center justify-center overflow-hidden flex-shrink-0">

                {logoPreview ? (

                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <UploadCloud
                    size={20}
                    className="text-[#c8a21a]"
                  />

                )}

              </div>

              <div className="flex-1 min-w-0">

                <p className="text-sm font-medium text-[#051933]">

                  {logoFile
                    ? logoFile.name
                    : logoPreview
                    ? "Replace logo"
                    : "Upload broker logo"}

                </p>

                <p className="text-xs text-[#94a3b8] mt-0.5">

                  PNG or JPG, optional

                </p>

              </div>

              <input
                id="broker-logo"
                type="file"
                accept="image/*"
                hidden
                onChange={
                  handleLogoChange
                }
              />

            </label>

          </div>

          {/* INFO */}
          <div>

            <label className="text-sm font-medium text-[#051933]">

              Information

            </label>

            <textarea
              name="info"
              value={
                form.info
              }
              onChange={
                handleChange
              }
              rows={5}
              required
              className="w-full rounded-2xl border border-[#ece4d8] bg-[#faf8f4] px-4 py-4 mt-2 outline-none focus:ring-2 focus:ring-[#c8a21a] resize-none"
            />

          </div>

          {/* BUTTONS */}
          <div className="flex items-center justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={() =>
                setOpen(
                  false
                )
              }
              disabled={saving}
              className="h-11 px-5 rounded-xl border border-[#ece4d8] text-[#64748b] disabled:opacity-50"
            >

              Cancel

            </button>

            <button
              type="submit"
              disabled={saving}
              className="h-11 px-6 rounded-xl bg-[#051933] text-white hover:opacity-90 transition disabled:opacity-60"
            >

              {saving
                ? "Saving..."
                : editingBroker
                ? "Update Broker"
                : "Create Broker"}

            </button>

          </div>

        </form>

      </Modal>

    </main>
  );
}