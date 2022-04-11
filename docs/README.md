# react-360-view
- A Very Simple and Beautiful 360&deg; Product Viewer built on React.js
- This is a simplied version of https://github.com/rajeevgade/react-360

## Features

- 360&deg; View


## Installation
```
npm install react-360-view-simple
```

## Config

```
import ThreeSixty from 'react-360-view-simple'
```

## Example

```
<ThreeSixty
    amount={36}
    imagePath="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36"
    fileName="chair_{index}.jpg?v1"
/>
```
### Adding a Header
```
<div class="v360-header text-light bg-dark">
    <span class="v360-header-title">36 Images - Autoplay (1 loop) - Reverse Spin</span>
    <span class="v360-header-description"></span>
</div>
```

## Props

| Name | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| amount | Number | Number of images | Yes |
| imagePath | String | Path to your image | Yes |
| fileName | String | File name format | Yes |
| spinReverse | Boolean | Reverse Spin | Optional | false |
| boxShadow | Boolean | Apply Box Shadow Background | Optional | false |
| paddingIndex | Boolean | Apply Leading Zero to Image Index | Optional | false |

## Credits

- [vue](https://reactjs.org/)
- [core-js](https://github.com/zloirock/core-js)
- [Cloud Image](https://www.cloudimage.io/)
- [React 360] (https://github.com/rajeevgade/react-360)
