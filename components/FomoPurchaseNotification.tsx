'use client';

import { useEffect, useState, useRef } from 'react';

const templates = [
  { country: 'アメリカ', flag: '🇺🇸', product: 'FreshLock スターターキット', minutes: 2 },
  { country: 'イギリス', flag: '🇬🇧', product: 'FreshLock Pro', minutes: 5 },
  { country: 'カナダ', flag: '🇨🇦', product: 'FreshLock スターターキット', minutes: 8 },
  { country: 'オーストラリア', flag: '🇦🇺', product: '真空パック袋 30枚入り', minutes: 3 },
  { country: 'ドイツ', flag: '🇩🇪', product: 'FreshLock Pro', minutes: 11 },
  { country: 'フランス', flag: '🇫🇷', product: 'FreshLock スターターキット', minutes: 6 },
  { country: '日本', flag: '🇯🇵', product: 'FreshLock Pro', minutes: 14 },
  { country: 'シンガポール', flag: '🇸🇬', product: '真空パック袋 50枚入り', minutes: 4 },
  { country: 'オランダ', flag: '🇳🇱', product: 'FreshLock スターターキット', minutes: 9 },
  { country: 'スウェーデン', flag: '🇸🇪', product: 'FreshLock Pro', minutes: 7 },
  { country: 'アイルランド', flag: '🇮🇪', product: '真空パック袋 30枚入り', minutes: 12 },
  { country: 'ニュージーランド', flag: '🇳🇿', product: 'FreshLock スターターキット', minutes: 5 },
];

export default function FomoPurchaseNotification() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<(typeof templates)[0] | null>(null);
  const [closed, setClosed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (closed) return;

    const showNotification = () => {
      const random = templates[Math.floor(Math.random() * templates.length)];
      setCurrent(random);
      setVisible(true);

      timerRef.current = setTimeout(() => {
        setVisible(false);
        timerRef.current = setTimeout(showNotification, 30000 + Math.random() * 30000);
      }, 5000);
    };

    const initialTimer = setTimeout(showNotification, 8000 + Math.random() * 7000);
    return () => {
      clearTimeout(initialTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [closed]);

  if (closed || !current) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-xs transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">{current.flag}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-800 leading-snug">
            <strong>{current.country}</strong>のお客様が{' '}
            <strong className="text-primary">{current.product}</strong>を購入しました
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {current.minutes}分前 · 最近の注文データに基づく
          </p>
        </div>
        <button
          onClick={() => setClosed(true)}
          className="text-gray-300 hover:text-gray-500 flex-shrink-0 -mt-1 -mr-1"
          aria-label="閉じる"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
