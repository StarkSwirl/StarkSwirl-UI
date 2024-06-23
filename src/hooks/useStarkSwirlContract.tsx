import { useState, useEffect } from 'react';
import { Contract, defaultProvider, Provider, Signer } from 'starknet';
import { useAccount, useProvider } from '@starknet-react/core';
import { pedersen, poseidonHash } from '@scure/starknet';

import StarkSwirlAbi from '../abi/StarkSwirl.json'; // Make sure to have the ABI file

interface UseStarkSwirlProps {
  onDepositSuccess?: () => void;
  onWithdrawSuccess?: () => void;
}

export const useStarkSwirl = ({ onDepositSuccess, onWithdrawSuccess }: UseStarkSwirlProps) => {
  const { account } = useAccount();
  const provider = useProvider();
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (provider && account) {
      const signer = new Signer(provider, account);
      const contractInstance = new Contract(StarkSwirlAbi, process.env.REACT_APP_STARKSWIRL_CONTRACT_ADDRESS as string, signer);
      setContract(contractInstance);
    }
  }, [provider, account]);

  const deposit = async (secret: string, nullifier: string, peaks: any) => {
    if (!contract) return;

    const commitment = pedersen(secret, nullifier);

    try {
      const { transaction_hash } = await contract.invoke('deposit', [commitment, peaks]);
      console.log('Deposit transaction hash:', transaction_hash);

      onDepositSuccess?.();
    } catch (error) {
      console.error('Deposit error:', error);
    }
  };

  const withdraw = async (proof: any, root: string, recipient: string, nullifier: string) => {
    if (!contract) return;

    const nullifier_hash = pedersen(nullifier);

    try {
      const { transaction_hash } = await contract.invoke('withdraw', [proof, root, recipient, nullifier_hash]);
      console.log('Withdraw transaction hash:', transaction_hash);

      onWithdrawSuccess?.();
    } catch (error) {
      console.error('Withdraw error:', error);
    }
  };

  return {
    deposit,
    withdraw,
  };
};
