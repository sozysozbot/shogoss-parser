import { parse } from ".";

test('hakomoon_kanbamiyako', () => {
    expect(parse(`▲７五ポ７四 
△３四ナ１四 
▲６五ポ２五 
△１一キ１五 
▲４五ポ５六 
△４二ナ１六 
▲９五ポ２四 
△２二銀２六 
▲１六ポ３六 
△３一金３四 
▲１五ポ４四 
△４四ポ３五 
▲４四ポ４五 
△４四ポ左３三 
▲６七ビ４六 
△６五ビ４一 
▲７八銀６六 
△７四ポ２六 
▲７四ポ１六 
△７四ナ４八
▲８五ポ８七 
△５五ポ７七 
▲７七桂 
△６四ポ７九 
▲６五桂５三 
△６五ポ７七 
▲２六ポ５四 
△６六ポ６五 
▲６六ポ６二 
△６六ナ９七 
▲６八ク４三 
△７八ナ８六 
▲７八ビ８九 
△５四ナ７六 
▲７六ナ４二 
△７五ナ６六 
▲４八銀７四 
△９四ポ２七 
▲９四ポ９三 
△９四ナ６七 
▲６七ビ５四
△７五ナ８八 
▲８八ル６三 
△５六ポ７九 
▲５六ビ右 
△６七ナ７八 
▲６七ビ７六 
△８七銀９八 
▲５八ク７三 
△９五ル７五 
▲８四ポ８二 
△９二香５五 
▲８三ポ成８二 
△８三ビ６四 
▲７八金９四 
△９六銀７六 
▲７七金８四 
△７四ビ９一 
▲８六金８七 
△９四香７七 
▲７六ビ８八 
△８五ル８九
▲９六金９二 
△９六香８六 
▲３二銀７二`)).toEqual([
        { "piece_phase": { "side": "黒", "to": ["７", "五"], "prof": "ポ" }, "stone_to": ["７", "四"] },
        { "piece_phase": { "side": "白", "to": ["３", "四"], "prof": "ナ" }, "stone_to": ["１", "四"] },
        { "piece_phase": { "side": "黒", "to": ["６", "五"], "prof": "ポ" }, "stone_to": ["２", "五"] },
        { "piece_phase": { "side": "白", "to": ["１", "一"], "prof": "キ" }, "stone_to": ["１", "五"] },
        { "piece_phase": { "side": "黒", "to": ["４", "五"], "prof": "ポ" }, "stone_to": ["５", "六"] },
        { "piece_phase": { "side": "白", "to": ["４", "二"], "prof": "ナ" }, "stone_to": ["１", "六"] },
        { "piece_phase": { "side": "黒", "to": ["９", "五"], "prof": "ポ" }, "stone_to": ["２", "四"] },
        { "piece_phase": { "side": "白", "to": ["２", "二"], "prof": "銀" }, "stone_to": ["２", "六"] },
        { "piece_phase": { "side": "黒", "to": ["１", "六"], "prof": "ポ" }, "stone_to": ["３", "六"] },
        { "piece_phase": { "side": "白", "to": ["３", "一"], "prof": "金" }, "stone_to": ["３", "四"] },
        { "piece_phase": { "side": "黒", "to": ["１", "五"], "prof": "ポ" }, "stone_to": ["４", "四"] },
        { "piece_phase": { "side": "白", "to": ["４", "四"], "prof": "ポ" }, "stone_to": ["３", "五"] },
        { "piece_phase": { "side": "黒", "to": ["４", "四"], "prof": "ポ" }, "stone_to": ["４", "五"] },
        { "piece_phase": { "side": "白", "to": ["４", "四"], "prof": "ポ", "from": "左" }, "stone_to": ["３", "三"] },
        { "piece_phase": { "side": "黒", "to": ["６", "七"], "prof": "ビ" }, "stone_to": ["４", "六"] },
        { "piece_phase": { "side": "白", "to": ["６", "五"], "prof": "ビ" }, "stone_to": ["４", "一"] },
        { "piece_phase": { "side": "黒", "to": ["７", "八"], "prof": "銀" }, "stone_to": ["６", "六"] },
        { "piece_phase": { "side": "白", "to": ["７", "四"], "prof": "ポ" }, "stone_to": ["２", "六"] },
        { "piece_phase": { "side": "黒", "to": ["７", "四"], "prof": "ポ" }, "stone_to": ["１", "六"] },
        { "piece_phase": { "side": "白", "to": ["７", "四"], "prof": "ナ" }, "stone_to": ["４", "八"] },
        { "piece_phase": { "side": "黒", "to": ["８", "五"], "prof": "ポ" }, "stone_to": ["８", "七"] },
        { "piece_phase": { "side": "白", "to": ["５", "五"], "prof": "ポ" }, "stone_to": ["７", "七"] },
        { "piece_phase": { "side": "黒", "to": ["７", "七"], "prof": "桂" } },
        { "piece_phase": { "side": "白", "to": ["６", "四"], "prof": "ポ" }, "stone_to": ["７", "九"] },
        { "piece_phase": { "side": "黒", "to": ["６", "五"], "prof": "桂" }, "stone_to": ["５", "三"] },
        { "piece_phase": { "side": "白", "to": ["６", "五"], "prof": "ポ" }, "stone_to": ["７", "七"] },
        { "piece_phase": { "side": "黒", "to": ["２", "六"], "prof": "ポ" }, "stone_to": ["５", "四"] },
        { "piece_phase": { "side": "白", "to": ["６", "六"], "prof": "ポ" }, "stone_to": ["６", "五"] },
        { "piece_phase": { "side": "黒", "to": ["６", "六"], "prof": "ポ" }, "stone_to": ["６", "二"] },
        { "piece_phase": { "side": "白", "to": ["６", "六"], "prof": "ナ" }, "stone_to": ["９", "七"] },
        { "piece_phase": { "side": "黒", "to": ["６", "八"], "prof": "ク" }, "stone_to": ["４", "三"] },
        { "piece_phase": { "side": "白", "to": ["７", "八"], "prof": "ナ" }, "stone_to": ["８", "六"] },
        { "piece_phase": { "side": "黒", "to": ["７", "八"], "prof": "ビ" }, "stone_to": ["８", "九"] },
        { "piece_phase": { "side": "白", "to": ["５", "四"], "prof": "ナ" }, "stone_to": ["７", "六"] },
        { "piece_phase": { "side": "黒", "to": ["７", "六"], "prof": "ナ" }, "stone_to": ["４", "二"] },
        { "piece_phase": { "side": "白", "to": ["７", "五"], "prof": "ナ" }, "stone_to": ["６", "六"] },
        { "piece_phase": { "side": "黒", "to": ["４", "八"], "prof": "銀" }, "stone_to": ["７", "四"] },
        { "piece_phase": { "side": "白", "to": ["９", "四"], "prof": "ポ" }, "stone_to": ["２", "七"] },
        { "piece_phase": { "side": "黒", "to": ["９", "四"], "prof": "ポ" }, "stone_to": ["９", "三"] },
        { "piece_phase": { "side": "白", "to": ["９", "四"], "prof": "ナ" }, "stone_to": ["６", "七"] },
        { "piece_phase": { "side": "黒", "to": ["６", "七"], "prof": "ビ" }, "stone_to": ["５", "四"] },
        { "piece_phase": { "side": "白", "to": ["７", "五"], "prof": "ナ" }, "stone_to": ["８", "八"] },
        { "piece_phase": { "side": "黒", "to": ["８", "八"], "prof": "ル" }, "stone_to": ["６", "三"] },
        { "piece_phase": { "side": "白", "to": ["５", "六"], "prof": "ポ" }, "stone_to": ["７", "九"] },
        { "piece_phase": { "side": "黒", "to": ["５", "六"], "prof": "ビ", "from": "右" } },
        { "piece_phase": { "side": "白", "to": ["６", "七"], "prof": "ナ" }, "stone_to": ["７", "八"] },
        { "piece_phase": { "side": "黒", "to": ["６", "七"], "prof": "ビ" }, "stone_to": ["７", "六"] },
        { "piece_phase": { "side": "白", "to": ["８", "七"], "prof": "銀" }, "stone_to": ["９", "八"] },
        { "piece_phase": { "side": "黒", "to": ["５", "八"], "prof": "ク" }, "stone_to": ["７", "三"] },
        { "piece_phase": { "side": "白", "to": ["９", "五"], "prof": "ル" }, "stone_to": ["７", "五"] },
        { "piece_phase": { "side": "黒", "to": ["８", "四"], "prof": "ポ" }, "stone_to": ["８", "二"] },
        { "piece_phase": { "side": "白", "to": ["９", "二"], "prof": "香" }, "stone_to": ["５", "五"] },
        { "piece_phase": { "side": "黒", "to": ["８", "三"], "prof": "ポ", "promotes": true }, "stone_to": ["８", "二"] },
        { "piece_phase": { "side": "白", "to": ["８", "三"], "prof": "ビ" }, "stone_to": ["６", "四"] },
        { "piece_phase": { "side": "黒", "to": ["７", "八"], "prof": "金" }, "stone_to": ["９", "四"] },
        { "piece_phase": { "side": "白", "to": ["９", "六"], "prof": "銀" }, "stone_to": ["７", "六"] },
        { "piece_phase": { "side": "黒", "to": ["７", "七"], "prof": "金" }, "stone_to": ["８", "四"] },
        { "piece_phase": { "side": "白", "to": ["７", "四"], "prof": "ビ" }, "stone_to": ["９", "一"] },
        { "piece_phase": { "side": "黒", "to": ["８", "六"], "prof": "金" }, "stone_to": ["８", "七"] },
        { "piece_phase": { "side": "白", "to": ["９", "四"], "prof": "香" }, "stone_to": ["７", "七"] },
        { "piece_phase": { "side": "黒", "to": ["７", "六"], "prof": "ビ" }, "stone_to": ["８", "八"] },
        { "piece_phase": { "side": "白", "to": ["８", "五"], "prof": "ル" }, "stone_to": ["８", "九"] },
        { "piece_phase": { "side": "黒", "to": ["９", "六"], "prof": "金" }, "stone_to": ["９", "二"] },
        { "piece_phase": { "side": "白", "to": ["９", "六"], "prof": "香" }, "stone_to": ["８", "六"] },
        { "piece_phase": { "side": "黒", "to": ["３", "二"], "prof": "銀" }, "stone_to": ["７", "二"] }
    ]);
});

