import { parse, parse_one } from ".";

test('usual', () => {
    expect(parse_one(`▲７五ポ７四`)).toEqual({ "piece_phase": { "side": "黒", "to": ["７", "五"], "prof": "ポ" }, "stone_to": ["７", "四"] });
});

test('no stone', () => {
    expect(parse_one(`☖７五ポ`)).toEqual({ "piece_phase": { "side": "白", "to": ["７", "五"], "prof": "ポ" } });
});

test('explicit mention of origin', () => {
    expect(parse_one(`▲７五ポ(77)７四`)).toEqual({ "piece_phase": { "side": "黒", "to": ["７", "五"], from: ["７", "七"], "prof": "ポ" }, "stone_to": ["７", "四"] });
});

test('unmatched parenthesis', () => {
    expect(() => parse_one(`▲７五ポ(77`)).toThrowError("開きカッコと座標の後に閉じカッコがありません");
});

test('explicit mention of origin', () => {
    expect(parse_one(`▲58金右７四`)).toEqual({ "piece_phase": { "side": "黒", "to": ["５", "八"], from: "右", "prof": "金" }, "stone_to": ["７", "四"] });
});

test('explicit mention of origin', () => {
    expect(parse_one(`▲58金左７四`)).toEqual({ "piece_phase": { "side": "黒", "to": ["５", "八"], from: "左", "prof": "金" }, "stone_to": ["７", "四"] });
});

test('explicit mention of origin', () => {
    expect(parse_one(`▲58金打７四`)).toEqual({ "piece_phase": { "side": "黒", "to": ["５", "八"], from: "打", "prof": "金" }, "stone_to": ["７", "四"] });
});

test('unparsable column', () => {
    expect(() => parse_one(`▲笑`)).toThrowError(`棋譜の筋（列）が「笑」であり「１〜９」「1〜9」のどれでもありません`);
});

test('unparsable row', () => {
    expect(() => parse_one(`▲5笑`)).toThrowError(`棋譜の段（行）が「笑」であり「１〜９」「1〜9」「一〜九」のどれでもありません`);
});

test('unparsable profession', () => {
    expect(() => parse_one(`▲58笑`)).toThrowError(`駒の種類が「笑」であり「香」「桂」「銀」「金」「成香」「成桂」「成銀」「杏」「圭」「全」「ク」「ル」「ナ」「ビ」「ポ」「歩」「兵」「と」「キ」「王」「超」のどれでもありません`);
});

test('unparsable promoted profession', () => {
    expect(() => parse_one(`▲58成笑`)).toThrowError(`駒の種類が「成笑」であり「香」「桂」「銀」「金」「成香」「成桂」「成銀」「杏」「圭」「全」「ク」「ル」「ナ」「ビ」「ポ」「歩」「兵」「と」「キ」「王」「超」のどれでもありません`);
});

test('unparsable start', () => {
    expect(() => parse_one(`58金打`)).toThrowError("棋譜が「黒」「▲」「☗」「白」「△」「☖」のどれかで始まっていません");
});

test('unparsable trailing', () => {
    expect(() => parse_one(`▲58金打７四（笑）`)).toThrowError("手「▲58金打７四（笑）」の末尾に解釈不能な「（笑）」があります");
});

test('unparsable trailing', () => {
    expect(() => parse_one(`▲58金hsjoihs`)).toThrowError("手「▲58金hsjoihs」の末尾に解釈不能な「hsjoihs」があります");
});

test('promoted piece', () => {
    expect(parse_one(`▲７五成桂７四`)).toEqual({ "piece_phase": { "side": "黒", "to": ["７", "五"], "prof": "成桂" }, "stone_to": ["７", "四"] });
});

test('promoted piece2', () => {
    expect(parse_one(`▲７五全７四`)).toEqual({ "piece_phase": { "side": "黒", "to": ["７", "五"], "prof": "成銀" }, "stone_to": ["７", "四"] });
});

test('promoted piece3', () => {
    expect(parse_one(`▲７五杏７四`)).toEqual({ "piece_phase": { "side": "黒", "to": ["７", "五"], "prof": "成香" }, "stone_to": ["７", "四"] });
});

test('promoted piece4', () => {
    expect(parse_one(`▲７五と７四`)).toEqual({ "piece_phase": { "side": "黒", "to": ["７", "五"], "prof": "と" }, "stone_to": ["７", "四"] });
});

test('promoted piece5', () => {
    expect(parse_one(`▲７五超７四`)).toEqual({ "piece_phase": { "side": "黒", "to": ["７", "五"], "prof": "超" }, "stone_to": ["７", "四"] });
});

test('not promote a piece', () => {
    expect(parse_one(`▲７三桂不成７四`)).toEqual({ "piece_phase": { "side": "黒", "to": ["７", "三"], "prof": "桂", promotes: false }, "stone_to": ["７", "四"] });
});

test('promote a piece with explicit origin', () => {
    expect(parse_one(`▲７三桂(85)成７四`)).toEqual({ "piece_phase": { "side": "黒", "to": ["７", "三"], "prof": "桂", from: ["８", "五"], promotes: true }, "stone_to": ["７", "四"] });
});


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

