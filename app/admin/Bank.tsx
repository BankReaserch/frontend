// "use client";

// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import axios from "axios";

// import {
//   Building2,
//   Search,
//   ShieldCheck,
//   FileText,
//   Lock,
//   Upload,
//   Plus,
//   Loader2,
//   Globe,
//   BadgeDollarSign,
//   Save,
// } from "lucide-react";
// import Modal from "@/components/utils/modal/FormModel";

// type BankType = {
//   _id: string;

//   name: string;

//   type: string;

//   location: string;

//   status: string;

//   website?: string;

//   assets?: string;

//   founded?: string;

//   publicInfo?: string;

//   reportAvailable?: boolean;

//   reportUrl?: string;
// };

// export default function BanksAdmin() {

//   /*
//   ========================================
//   STATES
//   ========================================
//   */

//   const [banks, setBanks] =
//     useState<BankType[]>([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [saving, setSaving] =
//     useState(false);

//   const [search, setSearch] =
//     useState("");

//   const [selectedBank, setSelectedBank] =
//     useState<BankType | null>(
//       null
//     );
//   const [isEditing, setIsEditing] =
//     useState(false);
//   const [detailsOpen, setDetailsOpen] =
//     useState(false);

//   const [formData, setFormData] =
//   useState({
//     name: "",
//     type: "",
//     location: "",
//     status: "Compliant",

//     website: "",

//     assets: "",

//     founded: "",

//     lastReviewed: "",

//     publicInfo: "",
//   });

//   const [reportFile, setReportFile] =
//     useState<File | null>(null);
//   const startEdit = (
//     bank: BankType
//   ) => {

//     setSelectedBank(bank);

//     setFormData({
//       name: bank.name || "",
//       type: bank.type || "",
//       location: bank.location || "",
//       status: bank.status || "Compliant",
//       website: bank.website || "",
//       assets: bank.assets || "",
//       founded: bank.founded || "",
//       publicInfo:
//         bank.publicInfo || "",
//     });

//     setIsEditing(true);
//   };
//   const updateBank =
//     async () => {

//       try {

//         setSaving(true);

//         const data =
//           new FormData();

//         Object.entries(
//           formData
//         ).forEach(
//           ([key, value]) => {
//             data.append(
//               key,
//               value
//             );
//           }
//         );

//         if (reportFile) {

//           data.append(
//             "report",
//             reportFile
//           );
//         }

//         const response =
//           await api.put(
//             `/api/banks/update/${selectedBank?._id}`,
//             data,
//             {
//               headers: {
//                 "Content-Type":
//                   "multipart/form-data",
//               },
//             }
//           );

//         if (
//           response.data.success
//         ) {

//           fetchBanks();

//           setIsEditing(false);

//           setSelectedBank(null);
//         }

//       } catch (error) {

//         console.error(error);

//       } finally {

//         setSaving(false);
//       }
//     };
//   const deleteBank =
//     async (
//       bankId: string
//     ) => {

//       const confirmed =
//         window.confirm(
//           "Delete this bank?"
//         );

//       if (!confirmed) return;

//       try {

//         await api.delete(
//           `/api/banks/delete/${bankId}`
//         );

//         fetchBanks();

//         setSelectedBank(null);

//       } catch (error) {

//         console.error(error);
//       }
//     };

//   /*
//   ========================================
//   AXIOS
//   ========================================
//   */

//   const api = axios.create({
//     baseURL:
//       process.env
//         .NEXT_PUBLIC_API_URL,

//     withCredentials: true,
//   });

//   /*
//   ========================================
//   FETCH BANKS
//   ========================================
//   */

//   const fetchBanks =
//     async () => {

//       try {

//         const response =
//           await api.get(
//             "/api/banks/all"
//           );

//         setBanks(
//           response.data
//             ?.data || []
//         );

//       } catch (error) {

//         console.error(
//           error
//         );

//       } finally {

//         setLoading(false);
//       }
//     };

//   useEffect(() => {

//     fetchBanks();

//   }, []);

//   /*
//   ========================================
//   FILTERED BANKS
//   ========================================
//   */

//   const filteredBanks =
//     useMemo(() => {

//       return banks.filter(
//         (bank) =>
//           bank.name
//             .toLowerCase()
//             .includes(
//               search.toLowerCase()
//             ) ||
//           bank.type
//             .toLowerCase()
//             .includes(
//               search.toLowerCase()
//             )
//       );

//     }, [banks, search]);

//   /*
//   ========================================
//   CREATE BANK
//   ========================================
//   */

//   const createBank =
//     async () => {

//       try {

//         setSaving(true);

//         const data =
//           new FormData();

//         Object.entries(
//           formData
//         ).forEach(
//           ([key, value]) => {
//             data.append(
//               key,
//               value
//             );
//           }
//         );

//         if (reportFile) {

//           data.append(
//             "report",
//             reportFile
//           );
//         }

//         const response =
//           await api.post(
//             "/api/banks/create",
//             data,
//             {
//               headers: {
//                 "Content-Type":
//                   "multipart/form-data",
//               },
//             }
//           );

//         if (
//           response.data
//             .success
//         ) {

//           fetchBanks();

//           setFormData({
//             name: "",

//             type: "",

//             location: "",

//             status:
//               "Compliant",

//             website: "",

//             assets: "",

//             founded: "",

//             publicInfo: "",
//           });

//           setReportFile(
//             null
//           );
//         }

//       } catch (error) {

//         console.error(
//           error
//         );

//       } finally {

//         setSaving(false);
//       }
//     };

//   /*
//   ========================================
//   STATUS COLOR
//   ========================================
//   */

//   const getStatusClass =
//     (
//       status: string
//     ) => {

//       switch (status) {

//         case "Mehudar":

//           return "bg-green-100 text-green-700";

//         case "Compliant":

//           return "bg-blue-100 text-blue-700";

//         case "Conditional":

//           return "bg-yellow-100 text-yellow-700";

//         case "Questionable":

//           return "bg-orange-100 text-orange-700";

//         case "Noncompliant":

//           return "bg-red-100 text-red-700";

//         default:

//           return "bg-gray-100 text-gray-700";
//       }
//     };

//   /*
//   ========================================
//   LOADING
//   ========================================
//   */

//   if (loading) {

//     return (
//       <div className="bg-white rounded-3xl p-10 border shadow-sm min-h-[400px] flex items-center justify-center">

//         <div className="flex items-center gap-3 text-[#0B1D34] font-semibold">

//           <Loader2 className="w-5 h-5 animate-spin" />

//           Loading banks...

//         </div>

//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_.7fr] gap-6">

//       {/* LEFT */}
//       <div className="space-y-6">

//         {/* HEADER */}
//         <div className="bg-white rounded-3xl border p-6 shadow-sm">

//           <div className="flex items-center justify-between gap-4 flex-wrap">

//             <div>

//               <p className="uppercase tracking-[4px] text-[#c7a43a] text-xs font-bold">

//                 Bank Directory

//               </p>

//               <h1 className="text-4xl font-bold text-[#0B1D34] mt-2">

//                 Manage Banks

//               </h1>

//             </div>

//             <div className="relative w-full md:w-[320px]">

//               <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

//               <input
//                 type="text"
//                 placeholder="Search bank..."
//                 value={search}
//                 onChange={(e) =>
//                   setSearch(
//                     e.target.value
//                   )
//                 }
//                 className="w-full rounded-2xl border bg-[#f7f3eb] py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#d4af37]"
//               />

//             </div>

//           </div>

//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-3xl border overflow-hidden shadow-sm">

//           <div className="overflow-x-auto">

//             <table className="w-full">

//               <thead className="bg-[#0B1D34] text-white">

//                 <tr>

//                   <th className="px-6 py-4 text-left">

//                     Bank

//                   </th>

//                   <th className="px-6 py-4 text-left">

//                     Type

//                   </th>

//                   <th className="px-6 py-4 text-left">

//                     Status

//                   </th>

//                   <th className="px-6 py-4 text-left">

//                     Report

//                   </th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {filteredBanks.map(
//                   (bank) => (

//                     <tr
//                       key={
//                         bank._id
//                       }
//                       onClick={() => {
//                         setSelectedBank(bank);
//                         setDetailsOpen(true);
//                       }}
//                       className="border-b cursor-pointer hover:bg-[#faf7f1] transition"
//                     >

//                       <td className="px-6 py-5">

//                         <div>

//                           <h3 className="font-semibold text-[#0B1D34]">

//                             {
//                               bank.name
//                             }

//                           </h3>

//                           <p className="text-sm text-gray-500 mt-1">

//                             {
//                               bank.location
//                             }

//                           </p>

//                         </div>

//                       </td>

//                       <td className="px-6 py-5 text-gray-600">

//                         {
//                           bank.type
//                         }

//                       </td>

//                       <td className="px-6 py-5">

//                         <span
//                           className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusClass(
//                             bank.status
//                           )}`}
//                         >

//                           {
//                             bank.status
//                           }

//                         </span>

//                       </td>

//                       <td className="px-6 py-5">

//                         {bank.reportAvailable ? (

//                           <div className="flex items-center gap-2 text-green-600 font-medium text-sm">

//                             <ShieldCheck className="w-4 h-4" />

//                             Premium

//                           </div>

//                         ) : (

//                           <div className="flex items-center gap-2 text-gray-400 text-sm">

//                             <Lock className="w-4 h-4" />

//                             None

//                           </div>

//                         )}

//                       </td>

//                     </tr>
//                   )
//                 )}

//               </tbody>

//             </table>

//           </div>

//         </div>

//       </div>

//       {/* RIGHT PANEL */}
//       <div className="space-y-6">

//         {/* CREATE BANK */}
//         <div className="bg-white rounded-3xl border shadow-sm p-6">

//           <div className="flex items-center gap-3 mb-6">

//             <div className="w-12 h-12 rounded-2xl bg-[#0B1D34] text-white flex items-center justify-center">

//               <Plus className="w-5 h-5" />

//             </div>

//             <div>

//               <h2 className="text-2xl font-bold text-[#0B1D34]">

//                 {isEditing
//                   ? "Edit Bank"
//                   : "Add Bank"}


//               </h2>

//               <p className="text-gray-500 text-sm mt-1">

//                 Public info +
//                 premium research report

//               </p>

//             </div>

//           </div>

//           <div className="space-y-4">

//             <input
//               type="text"
//               placeholder="Bank name"
//               value={
//                 formData.name
//               }
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   name:
//                     e.target.value,
//                 })
//               }
//               className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none"
//             />

//             <input
//               type="text"
//               placeholder="Bank type"
//               value={
//                 formData.type
//               }
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   type:
//                     e.target.value,
//                 })
//               }
//               className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none"
//             />

//             <input
//               type="text"
//               placeholder="Location"
//               value={
//                 formData.location
//               }
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   location:
//                     e.target.value,
//                 })
//               }
//               className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none"
//             />

//             <textarea
//               rows={4}
//               placeholder="Publicly available information..."
//               value={
//                 formData.publicInfo
//               }
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   publicInfo:
//                     e.target.value,
//                 })
//               }
//               className="w-full rounded-2xl border bg-[#f7f3eb] px-4 py-3 outline-none resize-none"
//             />

//             {/* REPORT */}
//             <label className="flex items-center gap-3 border-2 border-dashed rounded-2xl p-4 cursor-pointer bg-[#faf7f1] hover:border-[#d4af37] transition">

//               <Upload className="w-5 h-5 text-[#0B1D34]" />

//               <div>

//                 <p className="font-medium text-[#0B1D34]">

//                   Upload Premium Report

//                 </p>

//                 <p className="text-sm text-gray-500">

//                   Accessible only to subscribed users

//                 </p>

//               </div>

//               <input
//                 type="file"
//                 hidden
//                 accept=".pdf"
//                 onChange={(e) =>
//                   setReportFile(
//                     e.target
//                       .files?.[0] ||
//                     null
//                   )
//                 }
//               />

//             </label>

//             <button
//               onClick={
//                 isEditing
//                   ? updateBank
//                   : createBank
//               }
//               disabled={
//                 saving
//               }
//               className="w-full bg-[#0B1D34] hover:bg-[#132b4d] text-white rounded-2xl py-3 font-semibold transition flex items-center justify-center gap-2"
//             >

//               {saving ? (

//                 <Loader2 className="w-5 h-5 animate-spin" />

//               ) : (

//                 <Save className="w-5 h-5" />

//               )}

//               {isEditing
//                 ? "Update Bank"
//                 : "Save Bank"}

//             </button>

//           </div>

//         </div>

//       </div>
//       <Modal
//         open={detailsOpen}
//         onClose={setDetailsOpen}
//         title={selectedBank?.name}
//         size="xl"
//       >
//         {selectedBank && (

//           <div className="space-y-6">

//             <div className="flex items-center justify-between">

//               <span
//                 className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusClass(
//                   selectedBank.status
//                 )}`}
//               >
//                 {selectedBank.status}
//               </span>

//               <div className="text-right">

//                 <p className="text-xs uppercase tracking-[3px] text-gray-400">
//                   Assets
//                 </p>

//                 <p className="font-semibold text-[#0B1D34] mt-1">
//                   {selectedBank.assets || "-"}
//                 </p>

//               </div>

//             </div>

//             <div className="grid md:grid-cols-2 gap-5">

//               <div>

//                 <p className="text-xs uppercase tracking-[3px] text-gray-400">
//                   Type
//                 </p>

//                 <p className="mt-2 font-medium">
//                   {selectedBank.type}
//                 </p>

//               </div>

//               <div>

//                 <p className="text-xs uppercase tracking-[3px] text-gray-400">
//                   Location
//                 </p>

//                 <p className="mt-2 font-medium">
//                   {selectedBank.location}
//                 </p>

//               </div>

//               <div>

//                 <p className="text-xs uppercase tracking-[3px] text-gray-400">
//                   Founded
//                 </p>

//                 <p className="mt-2 font-medium">
//                   {selectedBank.founded || "-"}
//                 </p>

//               </div>

//               <div>

//                 <p className="text-xs uppercase tracking-[3px] text-gray-400">
//                   Website
//                 </p>

//                 <a
//                   href={selectedBank.website}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="mt-2 inline-flex items-center gap-2 text-[#c7a43a]"
//                 >
//                   <Globe size={15} />
//                   Visit Website
//                 </a>

//               </div>

//             </div>

//             <div className="bg-[#faf7f1] rounded-2xl p-5 border-l-4 border-[#d4af37]">

//               <p className="text-sm leading-7 text-gray-700">

//                 {selectedBank.publicInfo}

//               </p>

//             </div>

//             <div className="grid grid-cols-2 gap-3">

//               <button
//                 onClick={() => {
//                   setDetailsOpen(false);
//                   startEdit(selectedBank);
//                 }}
//                 className="h-11 rounded-xl bg-amber-500 text-white font-medium"
//               >
//                 Edit Bank
//               </button>

//               <button
//                 onClick={() =>
//                   deleteBank(selectedBank._id)
//                 }
//                 className="h-11 rounded-xl bg-red-500 text-white font-medium"
//               >
//                 Delete Bank
//               </button>

//               {selectedBank.reportUrl && (
//                 <>
//                   <button
//                     onClick={() =>
//                       window.open(
//                         `${process.env.NEXT_PUBLIC_API_URL}api/banks/view-report/${selectedBank._id}`,
//                         "_blank"
//                       )
//                     }
//                     className="h-11 rounded-xl border border-[#d4af37]"
//                   >
//                     View Report
//                   </button>

//                   <a
//                     href={`${process.env.NEXT_PUBLIC_API_URL}api/banks/download-report/${selectedBank._id}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="h-11 rounded-xl bg-[#0B1D34] text-white flex items-center justify-center"
//                   >
//                     Download Report
//                   </a>
//                 </>
//               )}

//             </div>

//           </div>

//         )}
//       </Modal>
//     </div>
//   );
// }

"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  Loader2,
  Search,
} from "lucide-react";
import { BankType } from "@/components/admin/bank/bank.types";
import BankDetailsModal from "@/components/admin/bank/BankDetailsModal";
import BankForm from "@/components/admin/bank/BankForm";
import BankTable from "@/components/admin/bank/BankTable";

export default function BanksAdmin() {

  /*
  ========================================
  AXIOS
  ========================================
  */

  const api = axios.create({
    baseURL:
      process.env
        .NEXT_PUBLIC_API_URL,

    withCredentials: true,
  });

  /*
  ========================================
  FORM
  ========================================
  */

  const initialForm = {
    name: "",
    type: "",
    location: "",
    status: "Compliant",

    website: "",

    assets: "",

    founded: "",

    lastReviewed: "",

    publicInfo: "",
  };

  /*
  ========================================
  STATES
  ========================================
  */

  const [banks, setBanks] =
    useState<BankType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [selectedBank, setSelectedBank] =
    useState<BankType | null>(
      null
    );

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [formData, setFormData] =
    useState(initialForm);

  const [reportFile, setReportFile] =
    useState<File | null>(
      null
    );

  /*
  ========================================
  FETCH BANKS
  ========================================
  */

  const fetchBanks =
    async () => {

      try {

        const response =
          await api.get(
            "/api/banks/all"
          );

        setBanks(
          response.data
            ?.data || []
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchBanks();

  }, []);

  /*
  ========================================
  FILTER
  ========================================
  */

  const filteredBanks =
    useMemo(() => {

      return banks.filter(
        (bank) =>
          bank.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          bank.type
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [banks, search]);

  /*
  ========================================
  CREATE
  ========================================
  */

  const createBank =
    async () => {

      try {

        setSaving(true);

        const data =
          new FormData();

        Object.entries(
          formData
        ).forEach(
          ([key, value]) => {

            data.append(
              key,
              value as string
            );

          }
        );

        if (
          reportFile
        ) {

          data.append(
            "report",
            reportFile
          );
        }

        const response =
          await api.post(
            "/api/banks/create",
            data,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        if (
          response.data
            .success
        ) {

          fetchBanks();

          setFormData(
            initialForm
          );

          setReportFile(
            null
          );

        }

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
  EDIT
  ========================================
  */

  const startEdit = (
    bank: BankType
  ) => {

    setSelectedBank(
      bank
    );

    setFormData({
      name:
        bank.name || "",

      type:
        bank.type || "",

      location:
        bank.location || "",

      status:
        bank.status ||
        "Compliant",

      website:
        bank.website || "",

      assets:
        bank.assets || "",

      founded:
        bank.founded || "",

      lastReviewed:
        bank.lastReviewed || "",

      publicInfo:
        bank.publicInfo || "",
    });

    setIsEditing(
      true
    );
  };

  const updateBank =
    async () => {

      if (
        !selectedBank
      ) return;

      try {

        setSaving(true);

        const data =
          new FormData();

        Object.entries(
          formData
        ).forEach(
          ([key, value]) => {

            data.append(
              key,
              value as string
            );

          }
        );

        if (
          reportFile
        ) {

          data.append(
            "report",
            reportFile
          );
        }

        const response =
          await api.put(
            `/api/banks/update/${selectedBank._id}`,
            data,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        if (
          response.data
            .success
        ) {

          fetchBanks();

          setFormData(
            initialForm
          );

          setReportFile(
            null
          );

          setSelectedBank(
            null
          );

          setIsEditing(
            false
          );

        }

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

  const deleteBank =
    async (
      bankId: string
    ) => {

      const confirmed =
        window.confirm(
          "Delete this bank?"
        );

      if (
        !confirmed
      ) return;

      try {

        await api.delete(
          `/api/banks/delete/${bankId}`
        );

        fetchBanks();

        setSelectedBank(
          null
        );

        setDetailsOpen(
          false
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };

  /*
  ========================================
  LOADING
  ========================================
  */

  if (loading) {

    return (
      <div className="bg-white rounded-3xl border p-10 min-h-[450px] flex items-center justify-center">

        <div className="flex items-center gap-3 text-[#0B1D34] font-semibold">

          <Loader2 className="w-5 h-5 animate-spin" />

          Loading Banks...

        </div>

      </div>
    );
  }

  /*
  ========================================
  UI
  ========================================
  */

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="bg-white rounded-3xl border p-6 shadow-sm">

        <div className="flex items-center justify-between gap-4 flex-wrap">

          <div>

            <p className="uppercase tracking-[4px] text-[#c7a43a] text-xs font-bold">

              Bank Directory

            </p>

            <h1 className="text-4xl font-bold text-[#0B1D34] mt-2">

              Manage Banks

            </h1>

          </div>

          <div className="relative w-full md:w-[320px]">

            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              placeholder="Search bank..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border bg-[#f7f3eb] py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#d4af37]"
            />

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_.65fr] gap-6">

        <BankTable
          banks={
            filteredBanks
          }
          onSelect={(
            bank
          ) => {

            setSelectedBank(
              bank
            );

            setDetailsOpen(
              true
            );

          }}
        />

        <BankForm
          formData={
            formData
          }
          setFormData={
            setFormData
          }
          reportFile={
            reportFile
          }
          setReportFile={
            setReportFile
          }
          saving={
            saving
          }
          isEditing={
            isEditing
          }
          onSubmit={
            isEditing
              ? updateBank
              : createBank
          }
        />

      </div>

      <BankDetailsModal
        bank={
          selectedBank
        }
        open={
          detailsOpen
        }
        onClose={
          setDetailsOpen
        }
        onEdit={
          startEdit
        }
        onDelete={
          deleteBank
        }
      />

    </div>
  );
}