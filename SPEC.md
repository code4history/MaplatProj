# 座標系変換仕様

## 座標系の定義

### 基本座標系
本ライブラリでは、以下の3つの座標系を基本座標系として定義します。

1. **基準座標系 (Reference Coordinate System: RCS)**
   - EPSG/Proj4/WKTで定義される標準的な地理座標系または投影座標系
   - 他の座標系の基準となる座標系

2. **変換中間座標系 (Transform Intermediate Coordinate System: TICS)**
   - アフィン変換によって生成される中間座標系
   - WorldFile定義に基づく変換を適用

3. **主画像座標系 (Primary Image Coordinate System: PICS)**
   - 座標系の正本となる座標系
   - 画像のピクセル座標に対応
   - 座標のExtentもこの座標系で定義

### 互換性のための座標系
地図APIとの互換性のために、以下の座標系を便宜的に定義します。

- **表示互換座標系 (Display Compatibility Coordinate System: DCCS)**
  - WMTSのみを扱う地図APIとの互換性のために定義
  - 画像座標系（PICS）から球面メルカトル座標系への便宜的な変換を提供

## 座標変換の定義

### 基本変換の方向
- 順変換: RCS → TICS → PICS
- 逆変換: PICS → TICS → RCS

### 変換メソッド

#### RCS ↔ TICS 間の変換
- アフィン変換を使用
- メソッド名:
  - 順変換: `toTics()`
  - 逆変換: `fromTics()`

#### TICS ↔ PICS 間の変換
- 三角網変換を使用
- メソッド名:
  - 順変換: `toPics()`
  - 逆変換: `fromPics()`

#### RCS ↔ PICS 間の直接変換
- 複合変換（アフィン変換 + 三角網変換）
- メソッド名:
  - 順変換: `rcsToPics()`
  - 逆変換: `picsToRcs()`

### DCCS関連の変換
- PICS ↔ DCCS間の変換（便宜的な変換）
- メソッド名:
  - PICS → DCCS: `toDccs()`
  - DCCS → PICS: `fromDccs()`

## 変換の例

```javascript
// RCS → PICS への順変換の例
const picsCoords = coords
  .toTics()    // RCS → TICS
  .toPics();   // TICS → PICS

// PICS → RCS への逆変換の例
const rcsCoords = coords
  .fromPics()  // PICS → TICS
  .fromTics(); // TICS → RCS

// 直接変換の例
const directPicsCoords = coords.rcsToPics();  // RCS → PICS
const directRcsCoords = coords.picsToRcs();   // PICS → RCS
```

## 注意事項

- 全ての座標系に全ての変換が定義されているわけではありません
- 例えば、RCSがEPSG:3857（球面メルカトル）で、アフィン変換と三角網変換が未定義の場合：
  - PICSも同じく球面メルカトル座標となります
  - DCCSへの変換は不要です（地図APIで直接扱えるため）
- DCCSは技術的な制約を克服するための便宜的な座標系であり、必要な場合にのみ使用します