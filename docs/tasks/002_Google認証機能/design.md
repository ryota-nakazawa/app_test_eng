# 002 Google認証機能 設計書

## 1. ユーザーニーズ
- **手軽なログイン**: 新しいパスワードを覚えることなく、既存のGoogleアカウントで簡単にログインしたい。
- **セキュリティ**: 安全にアカウントを管理し、個人情報を保護してほしい。
- **パーソナライズ**: 自分のアカウントでログインし、自分専用のダッシュボードや履歴を確認したい。
- **明確な状態表示**: 今ログインしているのかどうかが一目でわかり、必要な時にすぐにログアウトしたい。

## 2. 仕様要件
### 機能要件
- **Googleログイン**: Googleアカウントを使用したOAuth 2.0認証。
- **セッション管理**: ログイン状態の維持と管理。
- **ユーザー保存**: 初回ログイン時にMongoDBにユーザー情報を保存（名前、Email、アイコン画像）。
- **ページ保護**: `/dashboard` 以下のページはログインユーザーのみアクセス可能とする（未ログイン時はログイン画面へリダイレクト）。
- **ヘッダー表示**:
  - 未ログイン時: 「Login」ボタン表示
  - ログイン時: ユーザーアイコン、ユーザー名、「Logout」ボタン表示

### 技術要件
- **ライブラリ**: `next-auth@beta` (v5)
- **プロバイダー**: Google Provider
- **データベース**: MongoDB (Mongoose)
- **データモデル**: `User` コレクション
  - `name`: String
  - `email`: String (Unique)
  - `image`: String
  - `role`: String (Default: 'user')
  - `createdAt`: Date
- **ミドルウェア**: `middleware.ts` を使用してエッジで認証チェックを行う。

## 3. 処理手順設計（実装ステップ）

### Step 1: 環境構築
1.  `next-auth@beta` のインストール。
2.  `.env.local` の確認（`AUTH_SECRET`, `AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`）。

### Step 2: データベース設定
1.  `src/models/User.ts` の作成。
    - Mongooseスキーマの定義。

### Step 3: NextAuth設定 (v5)
1.  `src/auth.ts` の作成。
    - `NextAuth` の初期化。
    - `Google` プロバイダーの設定。
    - `callbacks` の設定（`signIn` 時にDB保存、`session` にユーザーIDを含める等）。
2.  `src/app/api/auth/[...nextauth]/route.ts` の作成。
    - GET/POST ハンドラーのエクスポート。

### Step 4: ミドルウェア設定
1.  `src/middleware.ts` の作成。
    - `/dashboard` 配下を保護対象に設定。
    - 認証状態のチェックとリダイレクト処理。

### Step 5: UI実装
1.  **ログイン画面**: `src/app/auth/signin/page.tsx`
    - Googleログインボタンの配置。
    - `form` アクションを使用したサーバーサイドログイン処理。
2.  **ダッシュボード**: `src/app/dashboard/page.tsx`
    - ログインユーザー情報の表示（セッション取得確認）。
    - ログアウトボタンの配置。
3.  **ヘッダー更新**: `src/app/layout.tsx` (またはHeaderコンポーネント)
    - セッション状態による表示切り替え実装。

### Step 6: 動作確認
1.  Googleログインの実行。
2.  MongoDBへのユーザー保存確認。
3.  ダッシュボードへのアクセス確認。
4.  未ログイン時のリダイレクト確認。
5.  ログアウト動作の確認。
