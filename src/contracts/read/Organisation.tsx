import { CONTRACTS_ADDRESSES, OrganisationABI } from "../contracts";

import * as z from "zod";
import { UseContractReadProps, useContractRead } from ".";
import { num, shortString } from "starknet";
// import { formatDecimals, formatDisplay } from "@/lib/numbers";

export const readOrganisation = {
    // get_all_campaigns
    get_all_campaigns: {
      returnType: z.object({ 0: z.bigint(),
                             1: z.array(z.object({
                                    name: z.bigint(),
                                    metadata: z.bigint(),
                                    start_time: z.bigint(),
                                    duration: z.bigint(),
                                    total_points_allocated: z.bigint(),
                                    token_address: z.bigint(),
                                    token_amount: z.bigint(),
                             })) }),
      parsedType: z
        .object({
          count: z.number(),
          orgs: z.array(z.object({ name: z.string(),
                                    metadata: z.string(),
                                    start_time: z.bigint(),
                                    duration: z.bigint(),
                                    total_points_allocated: z.bigint(),
                                    token_address: z.bigint(),
                                    token_amount: z.bigint(),
                                })),
        })
        .optional(),
      parse: function (data: unknown): z.infer<typeof this.parsedType> {
        if (!data) {
            console.log("gjgjhgjh")
            return undefined;
        }
  
        // parse
        const parsedData = this.returnType.parse(data);
        console.log("parseddata", parsedData);
  
        const campaignsCount = Number(parsedData["0"]!);
        const campaigns = [];
  
        for (let i = 0; i < campaignsCount; i++) {
            console.log(i,"i")
          const campaign = {
            // address: String(parsedData["1"]?.[i].organisation),
            name: shortString.decodeShortString(
                parsedData["1"][i].name.toString()
              ),
              metadata: shortString.decodeShortString(
                parsedData["1"][i].metadata.toString()
              ),
              start_time: parseInt(parsedData["1"]?.[i].start_time),
              duration: parseInt(parsedData["1"]?.[i].duration),
              total_points_allocated: parseInt(parsedData["1"]?.[i].duration),
              token_address: String(parsedData["1"]?.[i].duration),
              token_amount: parseInt(parsedData["1"]?.[i].duration),

          };
  
          campaigns.push(campaign);
        }
  
        return { count: campaignsCount, campaigns };
      },
      
        },
        owner: {
            returnType: z.string(),
            parsedType: z.string().optional(),
            parse: function (data: unknown): z.infer<typeof this.parsedType> {
              if (!data) return undefined;
        
              // parse
              const parsedData = this.returnType.parse(data);
        
              return parsedData;
            },
    },
} as const;

const useReadOrganisationContract = <R,>(props: UseContractReadProps) =>
    useContractRead<R>({
        abi: OrganisationABI,
        address: CONTRACTS_ADDRESSES.ORGANISATION,
        ...props,
    });

export const useGetAllCampaignDetails = () =>
    useReadOrganisationContract<
        z.infer<typeof readOrganisation.get_all_campaigns.parsedType>
    >({
        functionName: "get_all_campaigns",
        parseResultFn: (d) => {console.log("ddd", d) 
        readOrganisation.get_all_campaigns.parse(d)},
    });

    export const useGetOrganisationOwner = () =>
        useReadOrganisationContract<z.infer<typeof readOrganisation.owner.parsedType>>({
          functionName: "owner",
          parseResultFn: (d) => {console.log("ddsd", d)
          readOrganisation.owner.parse},
        });