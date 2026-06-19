const MOD_GUIDES = [
    {
        id: "create",
        name: "Create",
        category: "工業・自動化",
        difficulty: "中級から上級",
        installed: ["create-fabric-6.0.8.1+build.1744-mc1.20.1.jar"],
        summary: "歯車、ベルト、加工機械、列車、動く建築物を組み合わせて、自分で考えた工場を形にする工業MODです。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "Create は電力ケーブルで機械を並べるタイプではなく、回転力を歯車、シャフト、ベルト、チェーン、ギアボックスで伝えるのが特徴です。水車や風車などで回転を作り、その向き、速度、トルクを調整して加工機械を動かします。",
                    "プレス、ミキサー、クラッシャー、デプロイヤー、ファン、メカニカルアームを組み合わせると、鉱石処理、食料加工、部品量産、倉庫仕分けまで自動化できます。完成品をただ受け取るだけではなく、動いている工場そのものを見て楽しめるのが強みです。"
                ],
            },
            {
                title: "序盤の進め方",
                points: [
                    "まずは水車か風車で回転力を作り、シャフトと歯車で向きを変えながら機械まで届けます。",
                    "安定した工場にするなら、最初に Andesite Alloy、Cogwheel、Belt、Depot、Shaft をまとまった数だけ用意しておくと作業が止まりにくくなります。",
                    "JEI でレシピを見ながら、プレス、ミキサー、クラッシャー、ファン洗浄の順に触ると、Create の考え方を掴みやすいです。",
                    "作り方が分からない装置は Ponder 表示で動作例を確認できます。機械の向きと回転方向が分かれば大半の詰まりは解決できます。"
                ],
            },
            {
                title: "このサーバーでの見どころ",
                points: [
                    "Steam 'n' Rails、Big Cannons、Ore Excavation、Ultimate Factory などの Create アドオンが入っているため、単なる加工ラインを超えて交通網、資源採掘、砲台、長期工場まで広げられます。",
                    "Biomes O' Plenty や Dungeons and Taverns で探索先が広いので、列車輸送と拠点間物流の価値が高くなります。",
                    "Farmer's Delight の料理素材や Lightman's Currency のショップ在庫を Create 工場で量産すると、拠点運営やプレイヤー間取引にもつながります。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "ベルトやデプロイヤーを大量に置いた工場は見た目以上に処理が重くなります。常時稼働させるラインは必要な区画だけに分け、使わないときはクラッチで止めると管理しやすいです。",
                    "回転速度を上げすぎると Stress Capacity が足りなくなります。止まった機械は故障ではなく、負荷超過の可能性を先に見ます。",
                    "共有拠点では露出したシャフト、ノコギリ、ドリル、プレスの置き場所に注意してください。通路と工場ラインを分けると事故が減ります。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Create Fabric", url: "https://modrinth.com/mod/create-fabric" },
            { label: "GitHub: Create", url: "https://github.com/Creators-of-Create/Create" },
        ],
    },
    {
        id: "rails",
        name: "Create: Steam 'n' Rails",
        category: "交通・物流",
        difficulty: "中級",
        installed: ["Steam_Rails-1.7.2+fabric-mc1.20.1.jar"],
        summary: "Create の列車システムを、線路、信号、駅設備、連結、車両装飾まで広げる鉄道拡張MODです。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "Steam 'n' Rails は Create の列車をより鉄道らしくする拡張です。複数種類の線路、踏切、腕木信号、車掌要素、連結部品、煙突や汽笛など、線路を敷いて終わりではなく駅や車両の雰囲気まで作り込めます。",
                    "大量輸送だけが目的なら Create 本体の列車でも十分ですが、このMODがあると駅前広場、貨物ヤード、観光路線、拠点間シャトルなど、サーバー内の移動インフラを本格的に作れます。"
                ],
            },
            {
                title: "始め方",
                points: [
                    "最初は短い単線で、駅、スケジュール、列車組み立て、信号の基本だけを確認します。",
                    "複線や分岐を作る前に、列車がどこで待つのか、どこで荷物を積むのかを決めておくと後から作り直しにくくなります。",
                    "貨物輸送ではチェスト、倉庫、Create のベルトラインを駅に直結させると、採掘場や農場の成果を拠点へ自動搬入できます。"
                ],
            },
            {
                title: "このサーバーでの使い道",
                points: [
                    "遠方バイオーム、ダンジョン探索拠点、無限鉱脈の採掘施設、商店街を線路で結ぶと、移動時間を短縮しながらサーバーの地図にも意味が生まれます。",
                    "Lightman's Currency のショップや共同倉庫に貨物駅を置くと、売り物の補充ルートを見える形で作れます。",
                    "駅舎は Create Deco、Another Furniture、Interiors と相性が良く、ただの移動手段ではなく建築テーマにもできます。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "サーバー内の共有ルートは勝手に大きく伸ばさず、他プレイヤーの拠点や景観を避けて計画した方がトラブルになりにくいです。",
                    "列車が交差する場所は信号なしで運用すると詰まりやすいです。短距離でも駅前と分岐には信号を置き、待避場所を用意します。",
                    "線路下の空洞や急カーブは見た目と安全性に影響します。長距離路線ほど先に仮設線で動作確認してから装飾すると楽です。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Create Steam 'n' Rails", url: "https://modrinth.com/mod/create-steam-n-rails" },
        ],
    },
    {
        id: "cannons",
        name: "Create Big Cannons",
        category: "戦闘工業・イベント装置",
        difficulty: "上級",
        installed: ["createbigcannons-5.11.4-mc.1.20.1-fabric.jar"],
        summary: "Create の回転力と加工工程を使って、大型砲、砲身、砲弾、装填機構を作る拡張MODです。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "Create Big Cannons は、砲身の鋳造、砲弾の製造、装填、照準、発射までを工業工程として扱うMODです。単に強い武器を追加するのではなく、弾薬の供給、装填機構、角度調整、運搬まで含めて設備を作る必要があります。",
                    "完成した砲は拠点防衛、イベント用の射的、演出用の号砲、大型建築の可動ギミックとして使えます。Create 本体のクレーンやベルト、デプロイヤーと組み合わせるほど、機械らしい見た目になります。"
                ],
            },
            {
                title: "始め方",
                points: [
                    "最初は小型の砲と単純な弾で、砲身、装填、発射の流れを安全な場所で確認します。",
                    "大型化するほど素材も設置面積も増えるので、いきなり拠点内に作らず試験場を用意すると失敗しても復旧しやすいです。",
                    "自動装填を目指す場合は、砲弾製造ラインと装填ラインを分け、詰まったときにどの段階で止まったか見えるようにします。"
                ],
            },
            {
                title: "このサーバーでの使い道",
                points: [
                    "Dungeons and Taverns や YUNG's Better Structures の探索で得た素材を、大型装置の建造目標に回せます。",
                    "Create の列車で弾薬を砲台まで運ぶと、軍港、要塞、射撃場のようなテーマ建築を作れます。",
                    "マルチでは威力そのものより、設備を共同で設計して動かす遊びが中心になります。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "砲撃は地形や建築を壊す可能性があります。共有ワールドでは必ずルールと射線を確認してから使います。",
                    "自動化した砲台は誤作動すると危険です。弾薬倉庫と発射機構の間に手動停止できる仕組みを入れておくと安全です。",
                    "大量の砲弾や爆発を連続で使うとサーバー負荷にも影響します。イベント用途では回数と範囲を決めて運用します。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Create Big Cannons", url: "https://modrinth.com/mod/create-big-cannons" },
            { label: "Create Big Cannons Wiki", url: "https://github.com/Cannoneers-of-Create/CreateBigCannons/wiki" },
        ],
    },
    {
        id: "create-resources",
        name: "Create Ore Excavation / Ultimate Factory",
        category: "資源生産・長期工場",
        difficulty: "中級から上級",
        installed: [
            "createoreexcavation-fabric-1.20-1.6.1.jar",
            "create_ultimate_factory-2.1.0-fabric-1.20.1.jar",
        ],
        summary: "Create の工場を長期運用するために、鉱石、流体、希少素材の入手ルートを増やす資源系アドオンです。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "Create Ore Excavation は、ワールド内に隠れた鉱脈や流体資源を探し、Create の回転力でドリルや抽出装置を動かして資源を取り出すMODです。通常の洞窟採掘とは違い、発見した地点に採掘設備を建てて継続的に運用します。",
                    "Create Ultimate Factory は、Create のラインに追加レシピを増やして、通常は集めにくい素材や工場向け素材を別ルートで扱えるようにする補助的な拡張です。どちらも Create 本体の加工ラインを長く遊ぶための役割が強いです。"
                ],
            },
            {
                title: "始め方",
                points: [
                    "まずは鉱脈を探す道具を用意し、拠点から近い場所に採掘試験設備を作ります。",
                    "採掘装置は回転力を要求するため、水車や風車だけで足りない場合は、動力源を増やすか速度と負荷を見直します。",
                    "得られた鉱石はその場で砕く、洗う、焼く、運ぶのどこまで現地化するかを決めると、採掘基地の設計がしやすくなります。",
                    "長距離輸送が必要になったら Steam 'n' Rails の貨物列車と組み合わせると、無限鉱脈基地らしい運用になります。"
                ],
            },
            {
                title: "このサーバーでの使い道",
                points: [
                    "Big Cannons の砲身や弾薬、Create の大型工場、Lightman's Currency のショップ在庫など、長期的に素材を使うコンテンツを支える裏方になります。",
                    "遠方の鉱脈を見つけたプレイヤー同士で、採掘権、輸送路、商店への納品を分担するとマルチらしい経済が作れます。",
                    "単なる効率化ではなく、鉱山町、貨物駅、精錬所といった建築テーマを自然に作れるのが魅力です。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "無限資源は便利ですが、ラインを増やしすぎると保管と処理が追いつかなくなります。最初から自動停止や余剰処理を考えておくと倉庫が詰まりません。",
                    "共有資源にする場合は、採掘基地の所有者、搬出先、売買ルールを先に決めた方が揉めにくいです。",
                    "常時稼働する設備はサーバー負荷に直結します。必要な資源量に合わせて小さく始め、足りない分だけ増設します。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Create Ore Excavation", url: "https://modrinth.com/mod/create-ore-excavation" },
            { label: "Modrinth: Create Ultimate Factory", url: "https://modrinth.com/mod/create-ultimate-factory" },
        ],
    },
    {
        id: "biomes",
        name: "Biomes O' Plenty",
        category: "ワールド生成・探索",
        difficulty: "初心者から",
        installed: ["BiomesOPlenty-fabric-1.20.1-19.0.0.96.jar"],
        summary: "オーバーワールドを中心に、バイオーム、植物、木材、景観ブロックを大量に増やす探索系MODです。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "Biomes O' Plenty は、通常の Minecraft だけでは少ない景色の変化を大きく増やします。森、湿地、荒野、熱帯、雪原、幻想的な地形など、移動するたびに雰囲気の違う土地が見つかるようになります。",
                    "新しい木、葉、花、草、土、石系ブロックが増えるため、探索だけでなく建築素材の選択肢も広がります。大規模建築では、同じ木材でも地域ごとに色味を変えられるのが大きな利点です。"
                ],
            },
            {
                title: "遊び方の軸",
                points: [
                    "最初の拠点を決める前に周辺を少し広く見て、木材の種類、水場、平地、近い洞窟、近隣バイオームを確認します。",
                    "希少な植物や木は、見つけた場所を地図やミニマップに記録しておくと後で探し直す手間が減ります。",
                    "建築ではバイオームごとの素材を混ぜると、サーバー内の地域ごとに雰囲気を変えやすくなります。",
                    "遠征時は Simple Voice Chat や Xaero's Minimap を併用すると、迷子やはぐれを防ぎやすいです。"
                ],
            },
            {
                title: "このサーバーでの見どころ",
                points: [
                    "Dungeons and Taverns や YUNG's Better Structures と同時に入っているため、景色を探す旅の途中で構造物探索も発生しやすくなります。",
                    "Create の列車路線をバイオームごとに通すと、観光路線や素材輸送路として役割を持たせられます。",
                    "Farmer's Delight の農村、Lightman's Currency の商店街、RPG Series の職業拠点など、テーマ建築の背景として使いやすいです。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "バイオーム追加MODはワールド生成に関わるため、新規生成地域ほど見どころが多くなります。既に探索済みの近場だけで判断しない方が良いです。",
                    "木や花を取り尽くすと景観が崩れます。共有エリアでは苗木や種を持ち帰って栽培し、現地を荒らしすぎない運用が向いています。",
                    "地形が複雑なバイオームでは帰り道を失いやすいです。座標メモ、ベッド、予備食料を持って出かけます。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Biomes O' Plenty", url: "https://modrinth.com/mod/biomes-o-plenty" },
        ],
    },
    {
        id: "deeperdarker",
        name: "Deeper and Darker",
        category: "ディメンション・冒険",
        difficulty: "中級から上級",
        installed: ["deeperdarker-fabric-1.20-1.3.3-plus-b.jar"],
        summary: "Deep Dark を起点に、新ディメンション、ブロック、装備、モブ、探索目標を追加する冒険MODです。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "Deeper and Darker は Deep Dark の雰囲気をそのまま拡張し、古代都市やスカルク系の要素からさらに奥へ進む探索を作ります。暗く、音に敏感で、危険が分かりにくい場所を攻略する緊張感が中心です。",
                    "追加ディメンションの Otherside、スカルク由来のブロックや素材、専用装備、独自モブがあり、通常の洞窟探索とは別の準備が必要になります。明るい場所で素材を集める感覚のまま入るとかなり危険です。"
                ],
            },
            {
                title: "始め方",
                points: [
                    "まずは通常の Deep Dark と Ancient City を安全に探索できる装備を整えます。暗視、足場、羊毛、回復、帰還手段は必須です。",
                    "音への対策が重要です。無駄なジャンプ、ブロック破壊、チェスト開閉を減らし、通路を先に確保してから探索します。",
                    "初回は一人で奥まで行かず、荷物持ち、索敵、戦闘担当を分けると事故時に回収しやすいです。",
                    "新素材や装備は、どの敵から何を得るのかを JEI で確認し、目的を決めてから潜ると無駄な危険を減らせます。"
                ],
            },
            {
                title: "このサーバーでの見どころ",
                points: [
                    "RPG Series の職業装備や Farmer's Delight の料理バフを持ち込むと、攻略準備にも個性が出ます。",
                    "Otherside 方面は探索拠点や補給基地を建てる価値が高く、Create の列車や倉庫とつなげる長期目標にもできます。",
                    "Dark 系素材は建築にも使いやすく、地下都市、研究施設、封印された神殿のようなテーマに向いています。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "Deep Dark 系の探索はロスト時の回収が難しいです。貴重品を全部持ち込まず、予備装備を拠点に残してください。",
                    "視界が悪い場所では味方を攻撃したり置き去りにしたりしやすいです。Simple Voice Chat で現在地と行動を短く共有すると安全です。",
                    "危険地帯のポータルや入口を公共化する場合は、看板、照明、チェスト、避難路を置いて初見の人が即死しにくい状態にします。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Deeper and Darker", url: "https://modrinth.com/mod/deeperdarker" },
            { label: "Kyanite Mods", url: "https://kyanitemods.dev/mod/deeperdarker" },
        ],
    },
    {
        id: "dungeons",
        name: "Dungeons and Taverns",
        category: "構造物・探索",
        difficulty: "初心者から中級",
        installed: ["dungeons-and-taverns-3.0.3.f.jar"],
        summary: "バニラの雰囲気を壊しすぎず、旅の途中で出会えるダンジョン、酒場、塔、拠点系構造物を増やします。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "Dungeons and Taverns は、ワールド内に自然に見つかる構造物を増やすデータパック系MODです。名前の通り、ダンジョンだけでなく酒場や小さな拠点もあり、探索中に休憩場所、戦闘場所、戦利品ポイントが増えます。",
                    "派手な別世界を追加するのではなく、バニラの村や遺跡の延長として見つかるため、サーバー全体の冒険密度を上げる役割です。地上探索をしているだけでも寄り道が発生しやすくなります。"
                ],
            },
            {
                title: "遊び方の軸",
                points: [
                    "序盤は酒場や小規模構造物を見つけたら、ベッド、食料、チェスト、地図の拠点として使えます。",
                    "大きめのダンジョンは、入り口付近に臨時チェストとリスポーン地点を作ってから攻略すると回収が楽です。",
                    "戦利品だけを急いで取るより、構造物の形を見て建築の参考にすると長く楽しめます。",
                    "見つけた構造物を共有する場合は、座標だけでなく攻略済みか未攻略かも書いておくと、後続の人が判断しやすいです。"
                ],
            },
            {
                title: "このサーバーでの見どころ",
                points: [
                    "Biomes O' Plenty の多様な地形と重なるため、同じ構造物でも見つかる場所によって印象が変わります。",
                    "RPG Series の職業があるので、前衛、弓、魔法、回復役に分かれてダンジョンへ入る遊び方が成立します。",
                    "Lightman's Currency と組み合わせて、発見した酒場周辺に露店や補給所を作ると探索ルートが賑やかになります。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "構造物は誰かが既に攻略している場合があります。共有したい場所は看板やDiscordで状態を残すと混乱しにくいです。",
                    "敵が多い場所でベッドを壊されると帰還が難しくなります。入口から少し離れた安全地点に仮拠点を作ります。",
                    "一部の構造物は地形に埋まったり崖に生成されたりします。無理に突入せず、足場を確保してから探索します。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Dungeons and Taverns", url: "https://modrinth.com/datapack/dungeons-and-taverns" },
        ],
    },
    {
        id: "yungs",
        name: "YUNG's Better Structures",
        category: "構造物リワーク",
        difficulty: "初心者から上級",
        installed: [
            "YungsBetterDungeons-1.20-Fabric-4.0.4.jar",
            "YungsBetterStrongholds-1.20-Fabric-4.0.3.jar",
            "YungsBetterNetherFortresses-1.20-Fabric-2.0.6.jar",
            "YungsBetterEndIsland-1.20-Fabric-2.0.6.jar",
        ],
        summary: "バニラのダンジョン、要塞、ネザー要塞、エンド島を、より大きく探索しがいのある構造に作り替えるシリーズです。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "YUNG's Better シリーズは、バニラ構造物の役割を残しながら、形、規模、通路、部屋、戦利品、雰囲気を作り直すリワーク系MODです。このサーバーではダンジョン、Stronghold、Nether Fortress、End Island 系が導入されています。",
                    "通常なら短時間で見終わる構造物も、部屋の数や分岐が増えて、探索、戦闘、帰路確保の重要度が上がります。特に要塞やネザー要塞は、単なる通過点ではなく準備して攻略する場所になります。"
                ],
            },
            {
                title: "遊び方の軸",
                points: [
                    "Better Dungeons は序盤から中盤の探索目標になります。小部屋が多いので、松明やブロックでルートを印付けすると迷いにくいです。",
                    "Better Strongholds はエンド到達までの道中を大きく変えます。迷路化しやすいため、帰路、物資、修理手段を持って入ります。",
                    "Better Nether Fortresses はネザーの危険度を上げます。耐火、弓、ブロック、食料を用意し、足場を先に確保します。",
                    "Better End Island はエンド到達後の印象を変えます。ドラゴン戦だけでなく周辺の地形や構造にも注意が必要です。"
                ],
            },
            {
                title: "このサーバーでの見どころ",
                points: [
                    "Dungeons and Taverns と合わせて、地上、地下、ネザー、エンドのどこへ行っても探索目標が増えます。",
                    "RPG Series の職業分担が最も活きる場所です。盾役、弓役、魔法役、回収役を分けるだけで攻略の安定感が変わります。",
                    "攻略済み構造物を修復して前哨基地やショップに作り替えると、冒険の成果がワールドに残ります。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "構造が大きくなる分、迷子と装備ロストの危険も増えます。帰り道のマーキングは面倒でも必ず行います。",
                    "ネザーやエンドでは足場事故が最も危険です。戦闘力より先にブロック、落下対策、耐火を用意します。",
                    "マルチで未攻略構造物を見つけたら、攻略する前に同行希望者がいないか共有するとイベント化しやすいです。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: YUNG's Better Dungeons", url: "https://modrinth.com/mod/yungs-better-dungeons" },
            { label: "Modrinth: YUNG's Better Strongholds", url: "https://modrinth.com/mod/yungs-better-strongholds" },
            { label: "YUNGNICKYOUNG on Modrinth", url: "https://modrinth.com/organization/yungnickyoung" },
        ],
    },
    {
        id: "rpg",
        name: "Archers / Paladins / Rogues / Wizards",
        category: "職業・戦闘ロール",
        difficulty: "初心者から上級",
        installed: [
            "archers-1.3.0+1.20.1.jar",
            "paladins-1.4.0+1.20.1.jar",
            "rogues-1.2.0+1.20.1.jar",
            "wizards-1.4.1+1.20.1.jar",
        ],
        summary: "近接、弓、回復、魔法、機動力を分けて、戦闘を職業パーティー寄りにするRPG SeriesのMOD群です。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "この4つは単体でも遊べますが、まとめて入ることでマルチの戦闘役割がはっきりします。Archers は遠距離火力、Paladins は盾や聖職者系、Rogues は機動力と近接火力、Wizards は属性魔法や詠唱を担当します。",
                    "Spell Engine、Spell Power、Runes などの基盤MODも入っているため、武器、魔法、属性、装備効果が連動します。普通の剣と弓だけの戦闘より、装備ビルドやパーティー編成を考える場面が増えます。"
                ],
            },
            {
                title: "職業の選び方",
                points: [
                    "Archers は安全距離から削る役です。ダンジョンの通路、ネザー要塞、飛行敵の処理で強みがあります。",
                    "Paladins は前線維持や支援に向きます。味方と一緒に動くほど価値が出るので、ソロよりパーティー攻略で活躍しやすいです。",
                    "Rogues は素早く接近して倒す役です。防御が薄くなりやすいので、退路と回復を意識します。",
                    "Wizards は属性魔法と範囲攻撃が魅力です。距離管理とマナ、詠唱タイミングを覚えると探索が大きく変わります。"
                ],
            },
            {
                title: "このサーバーでの見どころ",
                points: [
                    "Dungeons and Taverns、YUNG's Better Structures、Deeper and Darker の攻略で、職業分担がそのまま戦いやすさに出ます。",
                    "Jewelry や Trinkets 系のアクセサリで装備の個性を足せるため、同じ職業でも耐久寄り、火力寄り、支援寄りに調整できます。",
                    "Farmer's Delight の料理を持ち込むと、回復や長期探索の安定度が上がります。職業装備だけでなく補給もビルドの一部です。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "強い職業を一つ選ぶより、攻略場所に合わせて役割を変える方が安定します。特に狭い通路では弓や魔法が味方の動きを邪魔することがあります。",
                    "装備やスキルの効果はバージョンや設定で変わることがあります。実際の数値は JEI とゲーム内説明を優先してください。",
                    "パーティー攻略では、誰が先頭、誰が回収、誰が撤退判断をするのかを決めておくとロストが減ります。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Archers", url: "https://modrinth.com/mod/archers" },
            { label: "Modrinth: Paladins & Priests", url: "https://modrinth.com/mod/paladins-and-priests" },
            { label: "Modrinth: Rogues & Warriors", url: "https://modrinth.com/mod/rogues-and-warriors" },
            { label: "Modrinth: Wizards", url: "https://modrinth.com/mod/wizards" },
        ],
    },
    {
        id: "soulslike",
        name: "Marium's Soulslike Weaponry",
        category: "ボス・伝説武器",
        difficulty: "中級から上級",
        installed: ["soulslike-weaponry-1.4.6-1.20.1-fabric.jar"],
        summary: "強力なボス、伝説的な武器、特殊素材を追加し、終盤の戦闘目標を増やすMODです。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "Marium's Soulslike Weaponry は、通常の装備更新だけでは物足りない中盤以降に、ボス戦と特殊武器という目標を足します。武器は見た目も性能も個性的で、ただ攻撃力が高いだけではなく、特殊効果や扱い方を含めて選ぶタイプです。",
                    "一部の武器や素材はボス討伐や高難度コンテンツと結びつきます。RPG Series の職業装備と合わせると、前衛、回避型、魔法型、遠距離支援などのビルドにさらに個性を足せます。"
                ],
            },
            {
                title: "始め方",
                points: [
                    "序盤から無理に狙うより、エンチャント、食料、予備装備、回復、遠距離手段が揃ってから挑むと安定します。",
                    "ボス戦を見つけたら、近くに仮拠点、ベッド、補給チェスト、退避通路を用意してから開始します。",
                    "武器は名前や見た目だけで選ばず、攻撃範囲、速度、特殊効果、耐久、必要素材を確認して自分の職業に合うものを選びます。",
                    "ソロで厳しい相手は、Paladin 系の支援役や Archer/Wizard の遠距離役と組むと攻略しやすくなります。"
                ],
            },
            {
                title: "このサーバーでの見どころ",
                points: [
                    "大型構造物や Deep Dark 系の危険地帯に挑む理由が増え、強い装備を作るための共同遠征が発生しやすくなります。",
                    "Lightman's Currency の経済と組み合わせると、レア素材、ボスドロップ、完成武器の取引が終盤コンテンツになります。",
                    "Create の工場で補給品を量産し、戦闘組がボスへ挑むような役割分担もできます。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "強力な武器はバランスを崩しやすいので、対人や共有イベントで使う場合は事前にルールを確認してください。",
                    "ボス戦の場所を壊しすぎると後続の人が遊びにくくなります。公共化する場所は入口と安全地帯を整備して残します。",
                    "武器効果は説明だけでは分かりにくいことがあります。初使用は人の拠点や公共施設から離れた場所で試します。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Marium's Soulslike Weaponry", url: "https://modrinth.com/mod/mariums-soulslike-weaponry" },
        ],
    },
    {
        id: "food",
        name: "Farmer's Delight",
        category: "農業・料理",
        difficulty: "初心者から",
        installed: ["FarmersDelight-1.20.1-2.4.1+refabricated.jar"],
        summary: "調理器具、料理、農業素材を増やし、食料を単なる満腹度回復から冒険準備へ変えるMODです。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "Farmer's Delight は、畑で素材を育て、まな板、鍋、フライパン、ナイフなどを使って料理を作る生活系MODです。パンやステーキだけで済ませる世界から、スープ、煮込み、弁当のような食事を準備する世界へ変わります。",
                    "料理は探索や戦闘の継続力に直結します。長いダンジョン、Deep Dark、ネザー、ボス戦では、食料の品質がそのまま生存率になります。農場を作る人と探索する人の役割分担も生まれます。"
                ],
            },
            {
                title: "始め方",
                points: [
                    "まずはナイフ、まな板、鍋、フライパンなど基本調理器具を揃えます。",
                    "畑はバニラ作物だけでなく、追加素材を安定して集められるように広めに作ると料理の幅が広がります。",
                    "序盤は作りやすい料理を量産し、遠征用チェストに常備しておくと探索前の準備が速くなります。",
                    "Create のベルトやメカニカルアームを使うと、作物の加工、調理素材の仕分け、料理の保管を自動化できます。"
                ],
            },
            {
                title: "このサーバーでの見どころ",
                points: [
                    "RPG Series のパーティー攻略では、料理を配る支援役がいるだけで長期探索が楽になります。",
                    "Lightman's Currency で食堂、弁当屋、遠征補給店を作ると、料理が商売として機能します。",
                    "Biomes O' Plenty の景色と合わせて、農村、レストラン、酒場、宿場町の建築テーマを作りやすいです。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "料理素材は種類が増えるほど倉庫を圧迫します。素材、半加工品、完成料理を分けて保管すると管理しやすいです。",
                    "食料を売る場合は、完成料理だけでなく素材セットや遠征用セットにすると買う側が使いやすいです。",
                    "畑を拡大しすぎると収穫と保管が追いつきません。まずはよく使う料理の材料だけを安定化させます。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Farmer's Delight Refabricated", url: "https://modrinth.com/mod/farmers-delight-refabricated" },
            { label: "GitHub: Farmer's Delight", url: "https://github.com/vectorwing/FarmersDelight" },
        ],
    },
    {
        id: "backpack",
        name: "Sophisticated Backpacks",
        category: "収納・探索補助",
        difficulty: "初心者から",
        installed: ["sophisticatedbackpacks-1.20.1-3.23.4.5.110.jar"],
        summary: "容量、フィルター、自動回収、補充、整理などのアップグレードで、持ち運び収納を大幅に強化するMODです。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "Sophisticated Backpacks は、普通のバックパックを段階的に強化していく収納MODです。容量を増やすだけでなく、拾ったアイテムを自動で入れる、特定アイテムだけを受け入れる、道具やブロックを補充するなど、探索と建築の手間を減らせます。",
                    "このサーバーはバイオーム、構造物、料理素材、職業装備、Create 部品など持ち歩く物が多いため、バックパックの設定が快適さに直結します。単なる大きなチェストではなく、遠征用の作業台として考えると強いです。"
                ],
            },
            {
                title: "始め方",
                points: [
                    "最初は容量アップグレードと基本バックパックだけで十分です。素材が揃ったら用途別に分けます。",
                    "採掘用、建築用、探索用、料理用、Create 部品用のように色や名前を分けると、持ち替えや共有が楽になります。",
                    "フィルターを設定すると、丸石、鉱石、植物、戦利品などを自動で分別できます。捨てるものと残すものを決めてから使うと効果的です。",
                    "マグネット系や自動回収系のアップグレードは便利ですが、共有倉庫周辺では他人のアイテムを吸わないように注意します。"
                ],
            },
            {
                title: "このサーバーでの見どころ",
                points: [
                    "YUNG's Better Structures や Dungeons and Taverns の長い探索で、戦利品を持ち帰れる量が増えます。",
                    "Create の建築では部品の種類が多いため、専用バックパックを作ると工事がかなり楽になります。",
                    "Lightman's Currency のショップ運営では、在庫補充用バッグや売上回収用バッグを作ると運用しやすいです。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "バックパックを失うと中身もまとめて失うため、貴重品を全部入れっぱなしにしない方が安全です。",
                    "自動吸引や補充の設定は便利な反面、意図しないアイテム移動が起きます。公共施設では一度設定を確認してから使います。",
                    "大容量化すると整理を後回しにしがちです。帰還したら素材、装備、売却品を分ける習慣を作ると後で困りません。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Sophisticated Backpacks", url: "https://modrinth.com/mod/sophisticated-backpacks" },
            { label: "GitHub: Sophisticated Backpacks", url: "https://github.com/P3pp3rF1y/SophisticatedBackpacks" },
        ],
    },
    {
        id: "currency",
        name: "Lightman's Currency",
        category: "経済・ショップ",
        difficulty: "初心者から中級",
        installed: ["lightmanscurrency_fabric-1.20.1-1.0.2.4.jar"],
        summary: "コイン、財布、販売機、取引端末などを追加し、プレイヤー間の商店と経済を作るMODです。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "Lightman's Currency は、マルチサーバー向けの通貨とショップ機能を追加します。チェストに物を置いて手渡しするだけの取引ではなく、価格を決め、在庫を入れ、購入者が自分で買える売り場を作れます。",
                    "工業、農業、探索、建築の成果をサーバー内の経済に変えられるのが魅力です。食料屋、鉱石屋、武器屋、建材屋、鉄道切符売り場のように、役割を持った店を作れます。"
                ],
            },
            {
                title: "始め方",
                points: [
                    "まずはコインと財布の扱いを確認し、小さな販売機やショップブロックで単品販売を試します。",
                    "価格は高くしすぎるより、補充の手間、素材の希少性、他プレイヤーが買いやすいかを見て調整します。",
                    "在庫が切れた店は機能しないので、Create や Farmer's Delight の自動生産品から売ると安定します。",
                    "商店街を作るなら、店名、販売品、連絡先、補充日を看板で書いておくと利用者が迷いません。"
                ],
            },
            {
                title: "このサーバーでの見どころ",
                points: [
                    "Create の量産品、Farmer's Delight の料理、Biomes O' Plenty の建材、RPG Series の素材など、ほぼ全ての大型MODの成果を売買できます。",
                    "Steam 'n' Rails と組み合わせると、貨物駅に商店を置いたり、遠方拠点の特産品を中央へ運ぶ経済圏を作れます。",
                    "探索が得意な人、工場が得意な人、建築が得意な人で、サーバー内の役割を自然に分けられます。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "通貨経済はルールが曖昧だと混乱します。公共価格、禁止取引、共有資源の扱いはサーバー側の方針を優先します。",
                    "在庫のない店や古い価格の店が増えると使いにくくなります。店主は定期的に補充と価格確認をします。",
                    "貴重品の取引では、ショップの所有者、価格、数量を必ず確認してから購入します。誤購入の返金ルールも事前に決めると安心です。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Lightman's Currency", url: "https://modrinth.com/mod/lightmans-currency" },
            { label: "Lightman's Currency Wiki", url: "https://github.com/Lightman314/LightmansCurrency/wiki" },
        ],
    },
    {
        id: "voice",
        name: "Simple Voice Chat",
        category: "ボイスチャット・連携",
        difficulty: "初心者から",
        installed: ["voicechat-fabric-1.20.1-2.6.18.jar"],
        summary: "ゲーム内の距離に応じた近接ボイスチャットやグループ通話で、探索、建築、イベントの連携をしやすくします。",
        sections: [
            {
                title: "どんなMOD？",
                body: [
                    "Simple Voice Chat は、Minecraft 内で音声通話を使えるようにするMODです。近くにいるプレイヤーの声が聞こえる近接ボイスが中心で、Discord の全員通話とは違い、ゲーム内の距離や状況に合わせた会話ができます。",
                    "探索中に現在地を伝える、建築中に位置合わせをする、列車やイベントの合図を出すなど、テキストチャットより速い連携が必要な場面で便利です。サーバー側の設定が必要なMODなので、導入ガイド通りに入れることが大切です。"
                ],
            },
            {
                title: "使い方の軸",
                points: [
                    "初回参加時はマイク入力、出力デバイス、音量、プッシュトゥトークの設定を確認します。",
                    "探索では、先頭、最後尾、迷子になった人が短く状況を共有するとパーティーが崩れにくいです。",
                    "建築では、ブロックの位置や高さを声で確認できるため、大型建築の共同作業がかなり楽になります。",
                    "距離が離れると聞こえ方が変わるため、重要な連絡はDiscordやテキストにも残すと確実です。"
                ],
            },
            {
                title: "このサーバーでの見どころ",
                points: [
                    "Deeper and Darker や YUNG's Better Structures のような危険な探索で、撤退判断や敵位置の共有がしやすくなります。",
                    "Create の工場や鉄道建設では、別々の場所で作業している人同士が確認を取りやすくなります。",
                    "Lightman's Currency の商店街やイベント会場では、近くにいる人だけと自然に会話できるため、ワールド内の雰囲気が出ます。"
                ],
            },
            {
                title: "注意点",
                points: [
                    "マイク音量が大きすぎると周囲に負担がかかります。参加前に入力レベルとノイズ抑制を確認します。",
                    "聞こえない場合は、MOD導入、キー設定、マイク権限、サーバー側のボイスチャットポートを順に確認します。",
                    "個人情報や周囲の生活音が入ることがあります。必要ならプッシュトゥトークを使い、配信や録画の有無にも注意します。"
                ],
            },
        ],
        sources: [
            { label: "Modrinth: Simple Voice Chat", url: "https://modrinth.com/plugin/simple-voice-chat" },
            { label: "Simple Voice Chat Wiki", url: "https://modrepo.de/minecraft/voicechat/wiki" },
        ],
    },
];

function guideEl(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (key === "className") node.className = value;
        else if (key === "text") node.textContent = value;
        else if (key === "dataset") {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                node.dataset[dataKey] = dataValue;
            });
        } else node.setAttribute(key, value);
    });

    children.forEach((child) => {
        if (typeof child === "string") node.appendChild(document.createTextNode(child));
        else if (child) node.appendChild(child);
    });
    return node;
}

function guideList(items, className) {
    const ul = guideEl("ul", { className });
    items.forEach((item) => {
        ul.appendChild(guideEl("li", { text: item }));
    });
    return ul;
}

function guideMeta(label, value) {
    return guideEl("div", { className: "guide-meta__item" }, [
        guideEl("span", { className: "guide-meta__label", text: label }),
        guideEl("strong", { className: "guide-meta__value", text: value }),
    ]);
}

function getGuideIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("mod") || window.location.hash.replace("#", "") || MOD_GUIDES[0].id;
}

function findGuide(id) {
    return MOD_GUIDES.find((guide) => guide.id === id) || MOD_GUIDES[0];
}

function renderGuideNav(activeId) {
    const nav = guideEl("nav", { className: "guide-nav", "aria-label": "MODガイド一覧" }, [
        guideEl("h2", { className: "guide-nav__heading", text: "GUIDES" }),
    ]);

    MOD_GUIDES.forEach((guide) => {
        const link = guideEl("a", {
            className: `guide-nav__link${guide.id === activeId ? " is-active" : ""}`,
            href: `mods.html?mod=${guide.id}`,
            dataset: { guideLink: guide.id },
        }, [
            guideEl("span", { className: "guide-nav__name", text: guide.name }),
            guideEl("span", { className: "guide-nav__category", text: guide.category }),
        ]);
        nav.appendChild(link);
    });

    return nav;
}

function renderSection(section) {
    const children = [guideEl("h2", { text: section.title })];

    (section.body || []).forEach((paragraph) => {
        children.push(guideEl("p", { text: paragraph }));
    });

    if (section.points && section.points.length) {
        children.push(guideList(section.points, "guide-point-list"));
    }

    return guideEl("section", { className: "guide-section" }, children);
}

function renderSources(sources) {
    const sourceList = guideEl("ul", { className: "guide-source-list" });
    sources.forEach((source) => {
        sourceList.appendChild(guideEl("li", {}, [
            guideEl("a", {
                href: source.url,
                target: "_blank",
                rel: "noopener",
                text: source.label,
            }),
        ]));
    });

    return guideEl("section", { className: "guide-section guide-section--sources" }, [
        guideEl("h2", { text: "参考リンク" }),
        guideEl("p", { text: "解説本文はKURONOMY向けに書き起こしたオリジナルです。仕様確認用に公式・配布ページへのリンクを置いています。" }),
        sourceList,
    ]);
}

function renderGuideDetail(guide) {
    const meta = guideEl("div", { className: "guide-meta" }, [
        guideMeta("Category", guide.category),
        guideMeta("Difficulty", guide.difficulty),
        guideMeta("Server Version", guide.installed.join(" / ")),
    ]);

    const sections = guide.sections.map(renderSection);
    sections.push(renderSources(guide.sources));

    return guideEl("article", { className: "guide-detail" }, [
        guideEl("section", { className: "guide-hero" }, [
            guideEl("p", { className: "guide-kicker", text: guide.category }),
            guideEl("h1", { className: "guide-title", text: guide.name }),
            guideEl("p", { className: "guide-summary", text: guide.summary }),
            meta,
        ]),
        guideEl("div", { className: "guide-content" }, sections),
    ]);
}

function renderAdjacentLinks(activeId) {
    const index = MOD_GUIDES.findIndex((guide) => guide.id === activeId);
    const prev = MOD_GUIDES[(index - 1 + MOD_GUIDES.length) % MOD_GUIDES.length];
    const next = MOD_GUIDES[(index + 1) % MOD_GUIDES.length];

    return guideEl("div", { className: "guide-adjacent" }, [
        guideEl("a", { href: `mods.html?mod=${prev.id}`, dataset: { guideLink: prev.id }, text: `前: ${prev.name}` }),
        guideEl("a", { href: `mods.html?mod=${next.id}`, dataset: { guideLink: next.id }, text: `次: ${next.name}` }),
    ]);
}

function renderCurrentGuide() {
    const root = document.getElementById("mod-guide-root");
    if (!root) return;

    const guide = findGuide(getGuideIdFromUrl());
    document.title = `${guide.name} | KURONOMY MOD解説`;
    root.replaceChildren(guideEl("div", { className: "guide-shell" }, [
        renderGuideNav(guide.id),
        guideEl("div", { className: "guide-main" }, [
            renderGuideDetail(guide),
            renderAdjacentLinks(guide.id),
        ]),
    ]));
}

window.addEventListener("DOMContentLoaded", () => {
    renderCurrentGuide();

    const root = document.getElementById("mod-guide-root");
    if (!root) return;

    root.addEventListener("click", (event) => {
        const link = event.target.closest("a[data-guide-link]");
        if (!link) return;

        event.preventDefault();
        window.history.pushState({}, "", link.getAttribute("href"));
        renderCurrentGuide();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

window.addEventListener("popstate", renderCurrentGuide);
