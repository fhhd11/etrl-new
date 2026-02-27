import React from 'react';
import { useGetUserBalance } from 'librechat-data-provider/react-query';
import { useAuthContext } from '~/hooks/AuthContext';

export default function BalanceWidget() {
  const { user } = useAuthContext();
  const { data } = useGetUserBalance({ enabled: !!user });

  if (!user) return null;

  const balanceString = data ?? '0';
  const balance = parseFloat(balanceString as string);
  const isPro = balance > 1000000;

  if (isPro) {
    return (
      <div className="flex cursor-default items-center justify-center gap-2 rounded-md bg-green-500/10 px-3 py-2 text-sm font-medium text-green-600 transition-colors dark:text-green-400" title="У вас активирован безлимитный PRO тариф">
        <span>💎</span>
        <span>PRO Тариф</span>
      </div>
    );
  }

  return (
    <a 
      href={`https://etrl.chat/billing?user_id=${user.id}&email=${encodeURIComponent(user.email ?? '')}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center gap-2 rounded-md bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-500/20 dark:text-blue-400"
    >
      <span>⚡️</span>
      <span>Улучшить тариф</span>
    </a>
  );
}
