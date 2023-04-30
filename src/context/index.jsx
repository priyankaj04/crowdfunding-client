import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers, BigNumber } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0xC2dAF9D6b4574972D3105B9ae1AB513110fCD197')
    const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign")
    const address = useAddress();
    const connect = useMetamask();
    let mode = 'dark';

    const publishCampaign = async (form) => {

        try {
            const data = await createCampaign({
                args: [
                    address, // owner
                    form.title, // title
                    form.description, // description
                    form.target,
                    new Date(form.deadline).getTime(), // deadline,
                    form.image
                ]
            })

            //console.log("Contract call success", data)
        } catch (error) {
            //console.log("Contract call failed", error)
        }

    }

    const darkmode = (check) => {
        mode = check;
        return mode;
    }

    const getCampaigns = async () => {
        try {
            const data = await contract.call("getCampaigns");

            const campaigns = data.map((item, index) => ({
                owner: item.owner,
                title: item.title,
                description: item.description,
                target: ethers.utils.formatEther(item.target.toString()),
                deadline: item.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(item.amountCollected.toString()),
                image: item.image,
                pId: index
            }))
            return campaigns;
        } catch (error) {
            //console.log("Get campaign data failed: ", error)
        }
    }

    const getUserCampaign = async () => {
        const allCampaigns = await getCampaigns();
        const filteredCampaigns = allCampaigns.filter(campaign => campaign.owner === address);
        return filteredCampaigns;
    }

    const donate = async (_pId, amount) => {
        const data = await contract.call('donateToCampaign', [_pId], {value: ethers.utils.parseEther(amount) });
        //console.log(data)
        return data;
    }

    const getDonations = async (_pId) => {
        const donations = await contract.call('getDonators', [_pId]);
        const numberOfDonations = donations[0].length;
        
        const parseDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parseDonations.push({
                donator: donations[0][i],
                donations: ethers.utils.formatEther(donations[1][i].toString())
            })
        }
        //console.log(parseDonations)
        return parseDonations;
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns,
                getUserCampaign,
                donate,
                getDonations, 
                mode,
                darkmode
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)