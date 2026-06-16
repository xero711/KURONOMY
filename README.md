# KURONOMY HomePage

GitHub Pages で公開する静的サイトです。旧環境の `/api/status` と HTTP リダイレクトには依存しません。

## Publish

1. この `HomePage` ディレクトリの中身を GitHub Pages 用リポジトリの公開ルートに置く。
2. GitHub の `Settings > Pages` で公開元ブランチを選ぶ。
3. 公開 URL は `https://xero-x.me/KURONOMY/` を想定する。
4. `xero-x.me` 直下に公開したい場合は、現在そのドメインを使っている別リポジトリからカスタムドメイン設定を外してから、このリポジトリに設定する。
5. HTTPS 証明書が発行されたら `Enforce HTTPS` を有効にする。

## DNS

Web は既存の GitHub Pages ドメインに向け、Minecraft は SRV レコードでゲームサーバーへ向ける構成を想定しています。

```text
mc    A      <minecraft-server-public-ip>
_minecraft._tcp  SRV  0 0 25565 mc.xero-x.me
```

Cloudflare を使う場合、`mc` は DNS only にしてください。通常の Cloudflare proxy は Minecraft Java の TCP 接続を中継しません。

## Status

トップページのオンライン状態とプレイヤー数は `https://api.mcsrvstat.us/3/xero-x.me` から取得します。API 側は 5 分程度キャッシュされるため、DNS 変更やサーバー再起動直後は反映に時間がかかります。
