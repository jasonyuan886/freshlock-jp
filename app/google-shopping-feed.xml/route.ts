import { products, SHIPPING_FEE } from '@/lib/data';

// Feed metadata that is NOT price/display data (marketing copy, mpn, taxonomy).
// PRICE / NAME / IMAGE / SHIPPING always come live from lib/data.ts - never drifts.
const FEED_META: Record<string, { title: string; desc: string; mpn: string; productType: string; images: string[] }> = {
  "freshlock-pro": {
    "title": "FreshLock Pro ハンディ真空ポンプ — コードレス・USB-C充電・-60kPa",
    "desc": "片手でワンタッチ操作のコードレス式ハンディ真空ポンプ。-60kPaの吸引力で数秒で空気を抜き、冷凍焼けを防止。着脱式ドリップトレイで汁物対応・丸洗いOK。専用袋不要で市販のエンボス加工バルブ付き袋に対応。USB-C充電・1200mAh・80〜100回使用可能。約210g軽量・BPAフリー。",
    "mpn": "FL-PRO-001",
    "ptype": "真空ポンプ",
    "images": [
      "https://jp.freshlocksealer.com/images/products/sealer-angled.jpg",
      "https://jp.freshlocksealer.com/images/products/sealer-kit.jpg",
      "https://jp.freshlocksealer.com/images/products/sealer-box-angle.jpg"
    ]
  },
  "freshlock-starter-kit": {
    "title": "FreshLock スターターキット — Pro本体+真空袋30枚",
    "desc": "FreshLock Pro本体にプレミアムエンボスバッグ30枚（小10・中10・大10）とUSB-Cケーブルをセット。箱を開けてすぐに真空保存が始められる。コードレス・USB-C充電・-60kPa吸引。単品合計より¥980おトク。送料無料。",
    "mpn": "FL-KIT-001",
    "ptype": "真空ポンプセット",
    "images": [
      "https://jp.freshlocksealer.com/images/products/sealer-main.jpg",
      "https://jp.freshlocksealer.com/images/products/sealer-box-angle.jpg"
    ]
  },
  "vacuum-seal-bags-30-pack": {
    "title": "プレミアムエンボスバッグ 30枚入り（中サイズ26×28cm）— BPAフリー・繰り返し使用可",
    "desc": "90μm厚PA+PE多層エンボスバッグ30枚。白い丸い片一方向バルブ+リンゴ緑zip-slider採用。BPAフリー・-20℃〜100℃対応・冷凍・湯せんOK。繰り返し使用可。ほとんどのバルブ式ハンディポンプに対応。",
    "mpn": "FL-BAG-M30",
    "ptype": "真空保存袋",
    "images": [
      "https://jp.freshlocksealer.com/images/products/bags-2.jpg"
    ]
  },
  "vacuum-seal-bags-50-pack": {
    "title": "プレミアムエンボスバッグ 50枚入り（大サイズ26×34cm・徳用）— BPAフリー・繰り返し使用可",
    "desc": "大サイズ（26×34cm）50枚入り徳用パック。90μm厚PA+PE多層エンボス・白丸バルブ+zip-slider。家族分・まとめ買い・低温調理（スーヴィード）に。BPAフリー・-20℃〜100℃対応・繰り返し使用可。1枚あたり最安値。",
    "mpn": "FL-BAG-L50",
    "ptype": "真空保存袋",
    "images": [
      "https://jp.freshlocksealer.com/images/products/bags-5.jpg"
    ]
  }
};

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function GET() {
  const BASE = 'https://jp.freshlocksealer.com';
  const items = products
    .map((p) => {
      const m = FEED_META[p.slug];
      if (!m) return '';
      const imgs = m.images.map((u) => `        <g:additional_image_link>${esc(u)}</g:additional_image_link>`).join('\n');
      return `    <item>
      <g:id>${p.slug}-jp</g:id>
      <g:title>${esc(m.title)}</g:title>
      <g:description>${esc(m.desc)}</g:description>
      <g:link>${BASE}/products/${p.slug}</g:link>
      <g:image_link>${BASE}${p.image}</g:image_link>
${imgs}
      <g:availability>in_stock</g:availability>
      <g:price>${p.price} JPY</g:price>
      <g:brand>FreshLock</g:brand>
      <g:condition>new</g:condition>
      <g:mpn>${m.mpn}</g:mpn>
      <g:google_product_category>500044</g:google_product_category>
      <g:product_type>${esc(m.productType)}</g:product_type>
      <g:shipping>
        <g:country>JP</g:country>
        <g:service>DHL</g:service>
        <g:price>${SHIPPING_FEE} JPY</g:price>
      </g:shipping>
    </item>`;
    })
    .filter(Boolean)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
    <channel>
      <title>FreshLock Japan</title>
      <link>${BASE}</link>
      <description>FreshLock ハンディ真空ポンプ - 公式ストア</description>
${items}
    </channel>
  </rss>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
