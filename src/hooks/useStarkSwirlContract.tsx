import { useEffect, useState, useMemo } from 'react';
import { 
  useAccount, 
  useContractRead, 
  useContractWrite, 
  useWaitForTransaction, 
  useContract 
} from '@starknet-react/core';
import { pedersen } from '@scure/starknet';
import StarkSwirlAbi from '@/abi/StarkSwirlABI.json'; 
import Erc20Abi from '@/abi/token.abi.json';
import { ETH_SEPOLIA, STRK_SEPOLIA } from "../utils/constant";

const useStarkSwirl = () => {
  const { address } = useAccount();
  const contractAddress = process.env.NEXT_PUBLIC_STARK_SWIRL_CONTRACT_ADDRESS || '';

  if (!contractAddress) {
    throw new Error('Contract address is not defined');
  }

  const {contract: starkSwirlContract} = useContract({
    abi: StarkSwirlAbi,
    address: contractAddress,
  });

  // const {contract: ethereumTokenContract} = useContract({
  //   abi: Erc20Abi,
  //   address: ETH_SEPOLIA || "",
  // });

  const [commitment, setCommitment] = useState<string | null>(null);

  const { data: denominator, refetch: refetchDenominator } = useContractRead({
    abi: StarkSwirlAbi,
    address: contractAddress,
    functionName: 'denominator',
  });

  const { data: tokenAddress, refetch: refetchTokenAddress } = useContractRead({
    abi: StarkSwirlAbi,
    address: contractAddress,
    functionName: 'token_address',
  });

  // const { data: allowanceValue, refetch: refetchAllowanceValue } = useContractRead({
  //   abi: Erc20Abi,
  //   address: ETH_SEPOLIA || "",
  //   functionName: 'allowance',
  //   args: [address as string, contractAddress as string],
  // });

  const calls = useMemo(() => {
    if (!commitment || !starkSwirlContract) return [];
    return starkSwirlContract.populateTransaction['deposit'](commitment, [0x05ad24c8c9a0bce5b38152ff9f6a42eca492daf83a27a089eab2ad7476740dc0]);
  }, [starkSwirlContract, commitment]);

  const { 
    writeAsync: deposit, 
    data: depositTxHash,
    error: depositError,
    isPending: isDepositPending,
    isSuccess: isDepositSuccess,
  } = useContractWrite({
    calls,
  });

  const depositHash = depositTxHash?.transaction_hash;

  const { status: depositStatus } = useWaitForTransaction({ hash: depositHash });

  // const generateCommitment = (secret: string, nullifier: string) => {
  //   const secretBigInt = BigInt(secret);
  //   const nullifierBigInt = BigInt(nullifier);
  //   const commitment = pedersen(secretBigInt, nullifierBigInt);
  //   setCommitment(commitment);
  // };

  const handleDeposit = async (commitment: string) => {
    if (commitment) {
      await deposit();
    }
  };

  useEffect(() => {
    if (depositStatus === 'success') {
      refetchDenominator();
    }
  }, [depositStatus]); //eslint-disable-line

  return {
    address,
    tokenAddress,
    denominator,
    deposit: handleDeposit,
    depositTxHash,
    depositStatus,
    depositError,
    isDepositPending,
    isDepositSuccess,
  };
};

export default useStarkSwirl;
