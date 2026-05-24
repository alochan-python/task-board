# Task Board

タスク管理ボードアプリ。React + Vite + TypeScript で構築。

## 技術スタック

- **フレームワーク**: React 18 + Vite
- **言語**: TypeScript（strict モード）
- **スタイリング**: Tailwind CSS
- **状態管理**: React Context / Zustand（規模に応じて選択）
- **テスト**: Vitest + Testing Library

## ディレクトリ構成

```
src/
  components/   再利用可能な UI コンポーネント
  pages/        ページ単位のコンポーネント
  hooks/        カスタムフック
  store/        状態管理
  types/        TypeScript 型定義
  utils/        ユーティリティ関数
```

## 開発コマンド

```bash
npm install       # 依存関係インストール
npm run dev       # 開発サーバー起動 (http://localhost:5173)
npm run build     # プロダクションビルド
npm run preview   # ビルド結果のプレビュー
npm run test      # テスト実行
npm run lint      # ESLint チェック
npm run typecheck # 型チェック
```

## コーディング規約

- コンポーネントは関数コンポーネント + TypeScript で記述
- Props には必ず型定義を付与
- `any` 型の使用禁止。不明な型は `unknown` を使用
- コメントは WHY が自明でない箇所のみ記載。WHAT の説明は不要
- ファイル名: コンポーネントは `PascalCase.tsx`、その他は `camelCase.ts`

## Git 運用ルール

### 基本方針

**コードを変更するたびに必ず GitHub にプッシュすること。**

変更をローカルに溜め込まない。作業単位ごとに即座にコミット＆プッシュする。

### ブランチ戦略

- `main`: 常にデプロイ可能な状態を維持
- `feature/<name>`: 機能追加
- `fix/<name>`: バグ修正
- `chore/<name>`: ビルド・設定変更

### コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/) に従う:

```
feat: タスクのドラッグ&ドロップ並び替えを追加
fix: 完了タスクが削除できない問題を修正
chore: Tailwind CSS の設定を更新
```

### プッシュのタイミング

以下のタイミングで必ずコミット＆プッシュを行う:

1. **機能実装完了時** — 動作確認済みのコードをプッシュ
2. **バグ修正完了時** — 修正内容をプッシュ
3. **作業中断前** — WIP コミットとしてプッシュ
4. **セッション終了時** — 未コミットの変更がないことを確認

### 手順

```bash
git add <変更ファイル>
git commit -m "feat: ..."
git push origin <branch>
```

未コミットの変更を確認:

```bash
git status
git diff
```
