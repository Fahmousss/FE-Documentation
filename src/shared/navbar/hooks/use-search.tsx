// import { HTTPResponse } from "@/core/models/http.types";
// import axios from "@/core/utils/axios.utils";
// import { LayoutServer } from "@/shared/grid-layout/utils/model";
// import { useQuery } from "@tanstack/react-query";

// export default function useSearch({
//   searchTerm,
//   enable,
// }: {
//   searchTerm?: string;
//   enable?: boolean;
// }) {
//   const { data, isLoading, isError, refetch } = useQuery({
//     queryKey: ["components"],
//     queryFn: () => {
//       return axios.get<HTTPResponse<LayoutServer[]>>(`/component`, {
//         params: {
//           searchTerm: searchTerm,
//         },
//       });
//     },
//     enabled: enable,
//   });

//   return {
//     dataComponents: data?.data?.data,
//     isLoadingComponents: isLoading,
//     isErrorComponents: isError,
//     refetchComponents: refetch,
//   };
// }
