# Music Collection

This template provides a basic setup for working with `React` (Vite). Here we use `tailwind` for styles, `Axios` and `tanstack/react-query` for data fetching and we use `rocketseat/eslint-config` for eslint (with prettier plugin) to promote better code standardization.
<br/>

Additionally, we provide some `aliases` to make it easier to import folders.

- [@vite](https://vitejs.dev/)
- [@tailwind](https://tailwindcss.com/docs/guides/vite)
- [@Axios](https://axios-http.com/ptbr/docs/intro)
- [@React Query](https://tanstack.com/query/latest/docs/react/overview)
- [@Storybook](https://storybook.js.org/docs/react/get-started/install/)
- [@eslint](https://eslint.org/)
- [@prettier](https://prettier.io/)
- [@rocketseat-eslint-config](https://github.com/Rocketseat/eslint-config-rocketseat.git)

<br/>

## To use this template you need to follow the next steps

```bash
git clone https://github.com/Bkuste2/music_collection_front
cd music_collection_front
yarn install
yarn dev
```

<br/>

## Aliases

These aliases are pre-configured in the project to help you with development

- @
- @pages
- @components
- @services
- @contexts
-	@helpers

If you want to create any alias, just follow the example below:

- `vite.config.ts`

```javascript
export default defineConfig({
  /* rest of your defineConfig function */
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // example
      'your_alias': resolve(__dirname, 'folder_path'),
    },
  },

})
```

- `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"], // example
      "your_alias/*": ["folder_path/*"]
    }
  }
}
```

<br/>

## Snippets

### fc

Create a simple functional component initial setup

```javascript
export interface FilenameProps {}

export const Filename: React.FC<FilenameProps> = () => {
  return (
   <div className="">
     <h1>Filename</h1>
   </div>
  )
}
```

<br/>

### cs

Create all useState structure

```javascript
const [$1, set${2:$1}] = useState<$3>($4)
```
