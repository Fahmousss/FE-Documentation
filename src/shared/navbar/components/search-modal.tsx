// import { useEffect, useRef, useState, useCallback, useMemo } from "react";
// import { Modal, Input, Spin, Empty, InputRef } from "antd";
// import debounce from "lodash/debounce";
// import useSearch from "../hooks/use-search";
// import { LayoutServer } from "@shared/grid-layout/utils/model";
// import { useNavigate } from "react-router-dom";
// import useComponents from "@/pages/dynamic-layout/hooks/use-components";
// import IconClose from "@/assets/icons/close.svg";
// import {
//   useHandlerLayoutContext,
//   useValueLayoutContext,
// } from "@/pages/dynamic-layout/hooks/use-layout-context";

// const SearchModal = ({ open, onClose }: any) => {
//   const inputRef = useRef<InputRef>(null);
//   const enableRef = useRef<boolean>(false);
//   const currentPageRef = useRef<number>(0);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   // const [currentPage, setCurrentPage] = useState(0);

//   const { dataComponents, refetchComponents } = useSearch({
//     searchTerm,
//     enable: enableRef.current,
//   });
//   const { refetchComponents: refetchPage } = useComponents({
//     page: currentPageRef.current,
//     dis: true,
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (open) {
//       const timer = setTimeout(() => {
//         inputRef.current?.focus();
//       }, 100);
//       return () => clearTimeout(timer);
//     }
//   }, [open]);

//   const debouncedSearch = useCallback(
//     debounce(async (value) => {
//       if (!value.trim()) {
//         setLoading(false);
//         enableRef.current = false;
//         return;
//       }

//       setLoading(true);
//       enableRef.current = true;

//       try {
//         await refetchComponents();
//       } catch (error) {
//         console.error("Search error:", error);
//       } finally {
//         setLoading(false);
//         enableRef.current = false;
//       }
//     }, 500),
//     [refetchComponents]
//   );

//   const handleSearch = useCallback(
//     (e: any) => {
//       const value = e.target.value;
//       setSearchTerm(value);
//       debouncedSearch(value);
//     },
//     [debouncedSearch]
//   );

//   const results = useMemo(() => dataComponents || [], [dataComponents]);
//   const { currentPage } = useValueLayoutContext();
//   const { setCurrentPage } = useHandlerLayoutContext();

//   const navigateSearch = useCallback(
//     (item: LayoutServer) => {
//       const queryParams = new URLSearchParams({
//         page: item?.page?.toString() || "",
//       });

//       navigate(`${item?.path}?${queryParams.toString()}`, {
//         state: {
//           page: item?.page,
//         },
//       });
//       setCurrentPage(item?.page as number);
//       currentPageRef.current = item?.page as number;
//       refetchPage();
//       setSearchTerm("");
//       onClose();
//     },
//     [navigate, onClose]
//   );

//   const onClickClose = () => {
//     setSearchTerm("");
//   };

//   const Suffix = (
//     <img
//       className="cursor-pointer"
//       onClick={onClickClose}
//       width={12}
//       height={12}
//       src={IconClose}
//       alt=""
//     />
//   );

//   return (
//     <Modal
//       title="Search"
//       open={open}
//       onCancel={onClose}
//       footer={null}
//       width={600}
//       className="search-modal"
//     >
//       <div className="space-y-4">
//         <Input
//           ref={inputRef}
//           size="large"
//           placeholder="Search for anything..."
//           prefix={
//             <SearchOutlined
//               onPointerEnterCapture={() => {}}
//               onPointerLeaveCapture={() => {}}
//               className="text-gray-400"
//             />
//           }
//           value={searchTerm}
//           onChange={handleSearch}
//           suffix={Suffix}
//         />

//         <div className="mt-4 max-h-96 overflow-y-auto">
//           {loading ? (
//             <div className="flex justify-center py-8">
//               <Spin size="large" />
//             </div>
//           ) : results.length > 0 ? (
//             <div className="space-y-2">
//               {results.map((item: LayoutServer, index: number) => (
//                 <div
//                   key={index}
//                   className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg transition-colors duration-150 ease-in-out"
//                   onClick={() => navigateSearch(item)}
//                 >
//                   <div className="flex flex-col">
//                     <h3 className="text-base font-medium dark:text-white">
//                       {item?.name_page}
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       {item?.title}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : searchTerm ? (
//             <Empty description="No results found" className="py-8" />
//           ) : (
//             <div className="text-center text-gray-500 py-8">
//               Start typing to search...
//             </div>
//           )}
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default SearchModal;
