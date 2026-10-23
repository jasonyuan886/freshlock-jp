export default function TokushohoPage() {
  const rows = [
    ['販売業者名', '深圳市七力科技有限公司（Shenzhen Qili Technology Co., Ltd.）'],
    ['運営責任者', '公孙離（こうそんり / Gongsun Li）'],
    ['所在地', '中国 広東省深圳市竜華区福城街道鑫源工業園C棟2階（龙华区福城街道鑫源工业园C栋2楼）'],
    ['電話番号', '+86 922-731-629（中国発信。国際電話のため、メールでのお問い合わせを推奨）'],
    ['メール', 'support@freshlocksealer.com（24時間受付）'],
    ['商品代金以外の必要料金', '送料：全国一律 ¥600（税込）／¥5,500（税込）以上のご注文で送料無料'],
    ['支払方法', 'PayPal（クレジットカード決済対応）'],
    ['支払時期', 'ご注文時に即時決済'],
    ['商品の引渡時期', 'ご注文確定後 7〜15日（中国からの国際発送）'],
    ['返品特約', '商品到着後 7日間は無条件で返品可能。到着後7日以内に support@freshlocksealer.com までご連絡ください。商品に欠陥がある場合の返品送料は当社負担、お客様都合の返品送料はお客様負担。'],
    ['免責事項', '本サイトは日本国外（中国）から発送される商品を扱っており、個人輸入の範囲でのご利用を前提としています。'],
  ]
  return (
    <main className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="text-2xl font-bold mb-2">特定商取引法に基づく表記</h1>
      <p className="text-sm text-gray-500 mb-8">（お客様からのお問い合わせはメールが確実です。国際電話のため電話が繋がりにくい場合はメールをご利用ください。）</p>
      <table className="w-full text-sm border-collapse">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="border-b border-gray-200">
              <th className="text-left py-3 pr-4 align-top whitespace-nowrap text-gray-600 font-semibold w-40">{k}</th>
              <td className="py-3 text-gray-800">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
