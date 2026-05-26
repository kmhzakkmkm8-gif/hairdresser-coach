# 美容師AIコーチ 練習ログ

新卒美容師のための練習記録＆AIコーチ相談アプリ（PWA）。
iPhoneのホーム画面に追加して、アプリのように使えます。

---

## このアプリでできること

- 📝 毎日の練習を記録（気分・スキル・採点・気づき）
- 📋 記録の履歴を見る
- 📊 週間の成長を集計・グラフ表示
- 🤖 AIコーチへの相談文を自動生成 → ChatGPT / Claude / Gemini で相談
- ⚙️ コーチの性格・自分のプロフィールを設定（相談文に自動反映）

データは各自の端末に保存されます（クラウド同期なし）。

---

## 公開のしかた（PCで1回だけ作業）

### 前提
- GitHub アカウント（無料）
- Vercel アカウント（無料・GitHubで登録）

### 手順

**1. このフォルダ一式を GitHub に上げる**

GitHub の新規リポジトリを作成 → 「uploading an existing file」から
このフォルダの中身（`node_modules` 以外すべて）をドラッグ＆ドロップしてコミット。

**2. Vercel でデプロイ**

1. https://vercel.com にログイン
2. 「Add New...」→「Project」
3. さきほどの GitHub リポジトリを「Import」
4. 設定はそのままで「Deploy」を押す
5. 数十秒で `https://〇〇.vercel.app` という URL が発行される

**3. 身内に URL を共有**

発行された URL を LINE などで送る。
受け取った人は iPhone の Safari で開く →
共有ボタン → 「ホーム画面に追加」でアプリ化完了。

---

## 開発者向け（ローカルで動かす場合）

```bash
npm install
npm run dev      # 開発サーバー
npm run build    # 本番ビルド（dist/ に出力）
```

---

## 技術構成

- React 18 + Vite
- vite-plugin-pwa（オフライン対応・ホーム画面追加）
- データ保存：localStorage（端末ローカル）
