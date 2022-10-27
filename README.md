# shogoss-parser

![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

しょ碁スの棋譜をパースする

## 受け付ける棋譜のフォーマット

以下の要素が順番に（間にスペースなど入れず）出てくるのが「一手」。この「一手」の集まりが棋譜。一手と一手の間には任意個のスペースや改行を入れることができる。

1. 「黒」「▲」「☗」「白」「△」「☖」のどれか
2. 移動先の座標。「55」「5５」「５５」「5五」「５五」などを受け付ける
3. 駒の種類。「香」「桂」「銀」「金」「成香」「成桂」「成銀」「杏」「圭」「全」「ク」「ル」「ナ」「ビ」「ポ」「歩」「兵」「と」「キ」「王」「超」を受け付ける
4. （オプショナル）移動元の指定。「右」「左」「打」と、丸括弧で囲まれた座標（つまり、「（5５)」「(５五）」など）に対応。「直」とかには対応していない
5. （オプショナル）「成」または「不成」
6. （オプショナル）碁石が置かれる座標の指定。「５五」など

くまりんぐ・キャスリングは、ともにキング王の動きとして書く（[shogoss-core](https://github.com/shoggoss/shogoss-core) には、キング王が「周り一マス」ではない動き方をしているのを検知してキャスリング or くまりんぐを自動で実行する仕組みが実装してある）

## 具体例

`▲７三桂(85)成７四` → ８五にあった桂馬が、７三に移動して、成った。そしてその後７四に碁石を打った

[src/index.test.ts](https://github.com/shoggoss/shogoss-parser/blob/main/src/index.test.ts) にもっと具体例がある。

