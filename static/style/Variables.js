import { css } from 'emotion';
import { breakpoints, mq } from '../style/Base.js';

/*---------------------------------------------------------------------------------------------------------------------
  1. Variables
---------------------------------------------------------------------------------------------------------------------*/
/*	1.1 Layout
---------------------------------------------------------------------------------------------------------------------*/
//天地左右flex
export const centerF = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

//justify : 両端揃えの設定
export const justify = css`
  text-align: justify;
  text-justify: inter-ideograph;
`;

//天地左右
export function center(direction) {
  if (direction == 'xy') {
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  } else if (direction == 'x') {
    return {
      //左寄せ
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    };
  } else if (direction == 'y') {
    return {
      // 右寄せ
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    };
  };
}

export const gridLayout = css`
  display: grid;
  display: -ms-grid;
`;

//border-radius
export const radius = css`
  border-radius: 2px;
`;

//カウンター
export function counter(numName, beforeText, afterText) {
  return {
    content: beforeText + 'counter(num_' + numName + ')' + afterText,
    counterIncrement: 'num_' + numName,
  };
}

export const secP = css`
  padding: 32px 24px;
  ${mq[1]} {
    padding: 64px 24px;
  }
`;

export const maxW = css`
  max-width: 680px;
`;

//SP横幅一括
export const sp96 = css`
  width: 96%;
  margin: auto;
`;

//card
export function card(bgcolor = Primary) {
  return {
    display: 'block',
    width: '85%',
    maxWidth: '400px',
    padding: '48px',
    radius,
    backgroundColor: bgcolor,
    boxSizing: 'border-box',

    'mq[2]': {
      padding: '32px',
    }
  };
}


/*---------------------------------------------------------------------------------------------------------------------
  2. Mixin
---------------------------------------------------------------------------------------------------------------------*/
/*	2.1 テキスト系
---------------------------------------------------------------------------------------------------------------------*/

//テキストを折り返さない
export function truncate(width = '400px') {
  return {
    width: width,
    maxWidth: '100%',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  };
}

//文字が溢れた際の表示を … にする（複数行対応, Chrome/Safariのみ）
export const lineTruncate = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

//複数行に下線を引く
export function multipleLine(color = underline, height = '65%') {
  return {
    background: 'linear-gradient(transparent ' + height + ', ' + color + '0 %)',
    display: 'inline',
  };
}

//リンクカラーの生成
export function linkColor(color = Primary) {
  return {
    color: color,
    '&:hover, &:active, &:focus': {
      color: 'lighten(' + color + ', 20%)',
    }
  };
}

/*	2.2 背景
---------------------------------------------------------------------------------------------------------------------*/
//背景画像
//img
// export const imgPath = '../static/image/',

// export function backgroundImage(fileName) {
//   return {
//     backgroundImage: 'url(' + imgPath + fileName + ') no-repeat 50% 50% / cover',
//   }
// };

//ブロックの縦横比を設定
// 第１引数：（必須）幅
// 第２引数：（必須）高さ
// 第３引数：背景画像を指定する際のみ画像へのパス
// export function aspectRatio(width, height, image_path = null) {
//   return {
//     display: 'block',
//     width: '100%',
//     height: '0',
//     paddingTop: '(' + height + ' / ' + width + ') * 100%',

//     if(image_path) {
//       return {
//         background: 'url(' + image_path + ') 50% 50% no-repeat/cover',
//       }
//     }
//   }
// }

//ウィンドウ幅のブロックを作る
export const fullWidth = css`
  margin-left: calc((100vw - 100%) / -2);
  margin-right: calc((100vw - 100%) / -2);
  max-width: auto;    // IE対策
  max-width: initial;
`;

/*	2.3 その他
---------------------------------------------------------------------------------------------------------------------*/
//shadow
export const shadow = css`
  box-shadow: 0 8px 16px rgba(0,0,0,0.12);
`;

//clearfix
export const clearfix = css`
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

//z-index
function zMap() {
  return {
    header: 'true',
    nav: 'true',
    child: {
      foo: 'true',
      bar: {
        hoge: 'true',
        fuga: 'true',
        hohoho: 'true'
      }
    }
  }
}

// // z-index
// export function z(name, childname = '0') {
//   let getkey = map.get(zMap, name);
//   if (childname != 0) {
//     return {
//       index(getkey, childname);
//     }
//   } else {
//     return {
//       inspect(index(zMap, (name, getkey)));
//   }
// }
// }
