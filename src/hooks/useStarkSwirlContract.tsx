import { useEffect, useState } from 'react';
import { 
  useAccount, 
  useContractRead, 
  useContractWrite, 
  useWaitForTransaction 
} from '@starknet-react/core';
import { pedersen, poseidonHash } from '@scure/starknet'; // Ensure you have the correct import path
import { Contract, uint256 } from 'starknet';
import StarkSwirlAbi from '../abi/StarkSwirl.json'; // Replace with the correct path to your ABI

const useStarkSwirl = () => {
  const { address } = useAccount();
  const contractAddress = process.env.NEXT_PUBLIC_STARK_SWIRL_CONTRACT_ADDRESS || '';

  if (!contractAddress) {
    throw new Error('Contract address is not defined');
  }

  const starkSwirlContract = new Contract(StarkSwirlAbi, contractAddress);

  const [commitment, setCommitment] = useState<bigint | null>(null);
  const [nullifierHash, setNullifierHash] = useState<bigint | null>(null);

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

  const { 
    write: deposit, 
    data: depositTxHash,
    error: depositError
  } = useContractWrite({
    abi: StarkSwirlAbi,
    address: contractAddress,
    functionName: 'deposit'
  });

  const { 
    write: withdraw, 
    data: withdrawTxHash,
    error: withdrawError
  } = useContractWrite({
    abi: StarkSwirlAbi,
    address: contractAddress,
    functionName: 'withdraw'
  });

  const { status: depositStatus } = useWaitForTransaction({ hash: depositTxHash });
  const { status: withdrawStatus } = useWaitForTransaction({ hash: withdrawTxHash });

  const generateCommitment = (secret: string, nullifier: string) => {
    const secretBigInt = BigInt(secret);
    const nullifierBigInt = BigInt(nullifier);
    const commitment = pedersen(secretBigInt, nullifierBigInt);
    setCommitment(commitment);
  };

  const generateNullifierHash = (nullifier: string) => {
    const nullifierBigInt = BigInt(nullifier);
    const nullifierHash = poseidon([nullifierBigInt]);
    setNullifierHash(nullifierHash);
  };

  const handleDeposit = async (secret: string, nullifier: string, peaks: any) => {
    generateCommitment(secret, nullifier);
    if (commitment) {
      await deposit({ args: [commitment, peaks] });
    }
  };

  const handleWithdraw = async (proof: any, root: string, recipient: string, nullifier: string) => {
    generateNullifierHash(nullifier);
    if (nullifierHash) {
      await withdraw({ args: [proof, root, recipient, nullifierHash] });
    }
  };

  useEffect(() => {
    if (depositStatus === 'success') {
      refetchDenominator();
    }
    if (withdrawStatus === 'success') {
      refetchTokenAddress();
    }
  }, [depositStatus, withdrawStatus]); //eslint-disable-line

  return {
    address,
    tokenAddress,
    denominator,
    deposit: handleDeposit,
    withdraw: handleWithdraw,
    depositStatus,
    depositError,
    withdrawStatus,
    withdrawError
  };
};

export default useStarkSwirl;
