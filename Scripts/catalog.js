// Thêm ảnh vào Images/ rồi điền tên tệp vào trường image hoặc mobileImage.
// Để chuỗi rỗng để hiển thị khung placeholder.
const audiences = ['Nữ', 'Nam', 'Trẻ em', 'Em bé'];

const categories = [
  { id: 'khoac', name: 'Áo khoác', image: 'uq-cat-khoac.jpg' },
  { id: 'thun', name: 'Áo thun & áo nỉ', image: 'uq-cat-thun.jpg' },
  { id: 'fleece', name: 'Áo giả lông cừu', image: 'uq-cat-fleece.jpg' },
  { id: 'len', name: 'Áo len & áo cardigan', image: 'uq-cat-len.jpg' },
  { id: 'somi', name: 'Áo sơ mi & áo kiểu', image: 'uq-cat-somi.jpg' },
  { id: 'polo', name: 'Áo polo', image: 'uq-pc018-trang.jpg' },
  { id: 'quan', name: 'Quần', image: 'uq-cat-quan.jpg' },
  { id: 'dam', name: 'Chân váy & đầm', image: 'uq-cat-dam.jpg' },
  { id: 'lot', name: 'Đồ mặc trong & tất', image: 'uq-cat-lot.jpg' },
  { id: 'nha', name: 'Đồ mặc nhà', image: 'uq-cat-nha.jpg' },
  { id: 'phukien', name: 'Phụ kiện', image: 'uq-cat-phukien.png' },
  { id: 'hoa-tiet', name: 'Áo thun in họa tiết', image: '' },
  { id: 'mac-nha', name: 'Đồ mặc nhà & đồ lót', image: 'uq-cat-mac-nha.png' },
  { id: 'giu-nhiet', name: 'Sản phẩm giữ nhiệt', image: '' },
  { id: 'uv', name: 'Sản phẩm chống tia UV', image: 'uq-cat-uv.png' },
  { id: 'dac-biet', name: 'Bộ sưu tập đặc biệt', image: '' },
  { id: 'mua-dong', name: 'Sản phẩm thiết yếu mùa đông', image: 'uq-cat-mua-dong.png' },
  { id: 'uu-dai', name: 'Khuyến mãi có hạn', image: '' },
  { id: 'gia-moi', name: 'Giá mới', image: '' },
  { id: 'sweat', name: 'Áo nỉ & hoodie', image: 'uq-cat-sweat.jpg' },
  { id: 'sport', name: 'Đồ thể thao', image: '' },
  { id: 'restock', name: 'Hàng về lại', image: '' },
  { id: 'new', name: 'Hàng mới tuần này', image: '' },
  { id: 'so-sinh', name: 'Đồ sơ sinh', image: '' },
  { id: 'tap-di', name: 'Đồ bé tập đi', image: '' },
];

const audienceCategoryImages = {
  "1": {
    "khoac": "uq-cat-1-khoac.jpg",
    "somi": "uq-cat-1-somi.jpg",
    "polo": "uq-pc018-trang.jpg",
    "thun": "uq-cat-1-thun.jpg",
    "sweat": "uq-cat-sweat.jpg",
    "fleece": "uq-cat-1-fleece.jpg",
    "len": "uq-cat-1-len.jpg",
    "quan": "uq-cat-1-quan.jpg",
    "lot": "uq-cat-1-lot.png",
    "phukien": "uq-cat-1-phukien.jpg"
  },
  "2": {
    "khoac": "uq-cat-2-khoac.jpg",
    "len": "uq-cat-2-len.png",
    "fleece": "uq-cat-2-fleece.jpg",
    "quan": "uq-cat-2-quan.jpg",
    "dam": "uq-cat-2-dam.png",
    "lot": "uq-cat-2-lot.png",
    "phukien": "uq-cat-2-phukien.jpg",
    "thun": "uq-cat-2-fleece.jpg"
  },
  "3": {
    "tap-di": "uq-cat-3-thun.jpg",
    "so-sinh": "uq-cat-3-lot.jpg",
    "quan": "uq-cat-3-quan.jpg",
    "lot": "uq-cat-3-lot.jpg",
    "nha": "uq-cat-3-nha.jpg",
    "khoac": "uq-pc038.jpg",
    "sweat": "uq-pc045-kem.jpg"
  }
};

const audienceCategories = [
  ['khoac', 'somi', 'thun', 'fleece', 'len', 'quan', 'dam', 'lot', 'nha', 'phukien', 'mac-nha', 'giu-nhiet', 'sport', 'dac-biet', 'uu-dai', 'gia-moi', 'restock', 'new'],
  ['khoac', 'somi', 'polo', 'thun', 'sweat', 'fleece', 'len', 'quan', 'lot', 'phukien', 'giu-nhiet', 'sport', 'dac-biet', 'hoa-tiet', 'uv', 'uu-dai', 'gia-moi', 'restock', 'new'],
  ['khoac', 'thun', 'fleece', 'quan', 'dam', 'nha', 'mua-dong', 'gia-moi', 'new'],
  ['so-sinh', 'tap-di', 'quan', 'khoac', 'sweat', 'nha', 'uu-dai', 'new'],
];

// Danh mục loại đồ lấy từ type. Chỉ các nhóm chủ đề bên dưới lấy từ collections.
const categoryTypes = {
  khoac: ['khoac', 'khoac-fleece'],
  thun: ['thun', 'sweat', 'hoa-tiet'],
  fleece: ['fleece', 'khoac-fleece'],
  lot: ['ao-lot', 'tat'],
  'mac-nha': ['nha', 'ao-lot'],
  'so-sinh': ['bo-so-sinh'],
};

const categoryCollections = new Set([
  'giu-nhiet', 'uv', 'dac-biet', 'mua-dong', 'uu-dai', 'gia-moi', 'sport', 'restock', 'new', 'tap-di',
]);

const primaryCategoryByType = {
  'khoac-fleece': 'fleece',
  'ao-lot': 'lot',
  tat: 'lot',
  'bo-so-sinh': 'so-sinh',
};

const heroes = [
  { title: 'BST Sản Phẩm Thiết Yếu Mùa Đông', description: 'Từ những ngày chớm lạnh đến giữa mùa đông, giữ ấm cùng những thiết kế Thu/Đông thiết yếu của PucciCot.', tag: 'Thịnh hành', tone: 'taupe', category: 'mua-dong', image: '', mobileImage: '' },
  { title: 'Mặc nhẹ, giữ ấm suốt ngày dài.', description: 'Khám phá trang phục giữ ấm PucciCot dành cho những ngày se lạnh.', tone: 'slate', category: 'giu-nhiet', image: '', mobileImage: '' },
  { title: 'BST Thu/Đông dành cho Trẻ Em', description: 'Những lớp áo mềm mại và thoải mái cho bé vui chơi mỗi ngày.', tag: 'Bộ sưu tập', tone: 'moss', category: 'mua-dong', tiles: ['uq-pc027-denim.jpg', 'uq-cat-2-quan.jpg', 'uq-cat-2-khoac.jpg'], image: '', mobileImage: '' },
  { title: 'BST Mềm Mại Cho Em Bé', description: 'Trang phục hằng ngày với kiểu dáng dễ mặc cho bé.', tag: 'Bộ sưu tập', tone: 'rose', category: 'tap-di', tiles: ['uq-pc037-vang.jpg', 'uq-pc038.jpg', 'uq-pc013-be.jpg'], image: '', mobileImage: '' },
];

// Tám ô banner, đọc từ trái qua phải và từ trên xuống trong mỗi cột.
const heroTiles = [
  { image: 'uq-pc028-trang.jpg' }, { image: 'uq-pc002.jpg' }, { image: 'uq-pc006-trang.jpg' }, { image: 'uq-pc019-phan.jpg' },
  { image: 'uq-pc004.jpg' }, { image: 'uq-pc024.jpg' }, { image: 'uq-pc017-do.jpg' }, { image: 'uq-pc008-nau.jpg' },
];

const menTiles = [
  { image: 'uq-pc007-den.jpg' }, { image: 'uq-pc018-trang.jpg' }, { image: 'uq-pc020-do.jpg' }, { image: 'uq-pc028-trang.jpg' },
  { image: 'uq-pc035-den.jpg' }, { image: 'uq-pc006-navy.jpg' }, { image: 'uq-pc035-chanh.jpg' }, { image: 'uq-pc025-den.jpg' },
];

const blackFriday = {
  startLabel: '11.13',
  endLabel: '11.24',
  startsAt: '2026-11-13T00:00:00+07:00',
  endsAt: '2026-11-24T23:59:59+07:00',
};

const campaigns = [
  { title: 'Áo len vải sợi mềm', description: 'Nhẹ nhàng và dễ phối trong những ngày chuyển mùa.', tag: 'Mới', for: [1], tone: 'sand', category: 'len', image: 'banner-ao-len-vai-soi-mem.png', mobileImage: '' },
  { title: 'Áo khoác PUFFTECH', description: 'Dáng áo nhẹ, dễ phối cho ngày se lạnh.', tag: 'PUFFTECH', for: [1], tone: 'sand', category: 'khoac', product: 'pc016', video: 'banner-pufftech.mp4', image: '', mobileImage: '' },
  { title: 'PucciCot | BST Thu/Đông', description: 'Khám phá cách phối lớp cho những ngày se lạnh.', tag: 'Bộ sưu tập mới', for: [1], tone: 'slate', category: 'mua-dong', centered: true, tiles: ['uq-pc001-be.jpg', 'uq-pc020-do.jpg', 'uq-pc016-tim.jpg'], image: '', mobileImage: '' },
  { title: 'Áo Giữ Nhiệt Mặc Trong', description: 'Một lớp áo mềm mại cho ngày trời trở lạnh.', for: [1], tone: 'rose', category: 'giu-nhiet', tiles: ['uq-pc007-den.jpg', 'uq-pc015-xam.jpg', 'uq-pc003-navy.jpg'], image: '', mobileImage: '' },
  { title: 'Bộ Sưu Tập Áo Khoác Casual', description: 'Thêm lớp, thêm lựa chọn cho trang phục hằng ngày.', for: [1], tone: 'moss', category: 'khoac', tiles: ['uq-pc001-be.jpg', 'uq-pc005-den.jpg', 'uq-pc016-tim.jpg'], image: '', mobileImage: '' },
  { title: 'Áo Thun Vải Gân Cổ V', description: 'Phom dáng gọn gàng, dễ kết hợp cùng nhiều trang phục.', for: [0], tone: 'taupe', category: 'thun', tiles: ['uq-pc019-kem.jpg', 'uq-pc019-phan.jpg', 'uq-pc019-den.jpg'], image: '', mobileImage: '' },
  { title: 'Áo Parka Chống Tia UV Bỏ Túi', description: 'Thiết kế gọn nhẹ để mang theo khi ra ngoài.', for: [1], tone: 'slate', category: 'uv', tiles: ['uq-pc005.jpg', 'uq-pc005-den.jpg'], image: '', mobileImage: '' },
  { title: 'Gợi Ý Trang Phục Công Sở', description: 'Phối áo sơ mi và quần cho một ngày làm việc.', for: [0], tone: 'sand', category: 'somi', tiles: ['uq-pc006-trang.jpg', 'uq-pc004.jpg', 'uq-pc017-do.jpg'], image: '', mobileImage: '' },
  { title: 'Bộ Sưu Tập Quần', description: 'Những dáng quần dễ mặc cho nhiều dịp.', for: [0], tone: 'moss', category: 'quan', tiles: ['uq-pc004.jpg', 'uq-pc024.jpg', 'uq-pc024-navy.jpg'], image: '', mobileImage: '' },
  { title: 'Áo Len Dệt Kim Cổ V', description: 'Một lựa chọn dễ phối cho tủ đồ Thu/Đông.', for: [0], tone: 'rose', category: 'len', tiles: ['uq-pc002-hong.jpg', 'uq-pc002-kem.jpg', 'uq-pc002-than.jpg'], image: '', mobileImage: '' },
];

const babyFeature = {
  title: 'Áo nỉ Chú Sâu Háu Ăn',
  description: 'Họa tiết từ thế giới truyện của Eric Carle.',
  product: 'pc045',
  image: '',
  artwork: 'banner-baby-artwork-reference.png',
};

const posts = [
  { id: 'phoi-lop', title: 'Phối lớp cho ngày se lạnh', summary: 'Bắt đầu từ một lớp cơ bản, rồi thêm chất liệu và màu sắc theo thời tiết.', date: '2026-11-12', image: 'uq-hero-winter.jpg', category: 'mua-dong', paragraphs: ['Chọn một chiếc áo thun mềm làm lớp trong cùng. Áo len mỏng hoặc cardigan có thể mặc bên trên khi nhiệt độ giảm.', 'Hoàn thiện với áo khoác rộng vừa đủ để cử động thoải mái. Giữ các lớp cùng tông nếu bạn muốn tổng thể gọn gàng.'] },
  { id: 'cham-cotton', title: 'Chăm sóc trang phục cotton', summary: 'Vài thói quen nhỏ giúp bạn giữ quần áo cotton dễ mặc qua nhiều lần giặt.', date: '2026-11-09', image: 'uq-pc003-trang.jpg', category: 'thun', paragraphs: ['Đọc nhãn hướng dẫn của từng món đồ trước khi giặt. Phân loại màu sáng và màu đậm, lộn trái quần áo in hình trước khi cho vào máy.', 'Phơi ở nơi thoáng gió và vuốt phẳng các đường may khi đồ còn ẩm. Gấp ngay sau khi khô để hạn chế nếp nhăn.'] },
  { id: 'cong-so', title: 'Gợi ý phối đồ công sở', summary: 'Những cách kết hợp áo sơ mi và quần dễ mặc trong cả tuần.', date: '2026-11-05', image: 'uq-pc006-trang.jpg', category: 'somi', paragraphs: ['Áo sơ mi sáng màu và quần tối màu là một cách phối dễ bắt đầu. Hãy chọn phom để bạn có thể ngồi và vận động thoải mái.', 'Khi trời se lạnh, thêm cardigan hoặc áo khoác nhẹ. Phụ kiện đơn giản giúp bạn đổi phong cách mà vẫn tận dụng được những món đồ có sẵn.'] },
];

// Dữ liệu minh họa để thử tìm kiếm, yêu thích và giỏ hàng.
const products = [
  { id: 'pc001', name: 'Áo Khoác Casual', price: 999000, type: 'khoac', collections: ['mua-dong'], for: [1], image: 'uq-pc001-be.jpg' },
  { id: 'pc002', name: 'Áo Len Dệt Kim Cổ V', price: 599000, type: 'len', collections: ['mua-dong', 'gia-moi'], for: [0], image: 'uq-pc002.jpg' },
  { id: 'pc003', name: 'Áo Thun Cotton Cổ Tròn', price: 249000, type: 'thun', collections: ['uu-dai'], for: [1], image: 'uq-pc003-trang.jpg' },
  { id: 'pc004', name: 'Quần Vải Ống Rộng', price: 699000, type: 'quan', for: [0], image: 'uq-pc004.jpg' },
  { id: 'pc005', name: 'Áo Parka Chống Tia UV', price: 799000, type: 'khoac', collections: ['uv', 'restock'], for: [1], image: 'uq-pc005.jpg' },
  { id: 'pc006', name: 'Áo Sơ Mi Cotton', price: 499000, type: 'somi', for: [0], image: 'uq-pc006-trang.jpg' },
  { id: 'pc007', name: 'Áo Giữ Nhiệt Mặc Trong', price: 349000, type: 'ao-lot', collections: ['giu-nhiet', 'mua-dong'], for: [1], image: 'uq-pc007.jpg' },
  { id: 'pc008', name: 'Áo Khoác Giả Lông Cừu', price: 649000, type: 'khoac-fleece', collections: ['mua-dong'], for: [0], image: 'uq-pc008-nau.jpg' },
  { id: 'pc009', name: 'Đầm Cotton Dáng Suông', price: 549000, type: 'dam', for: [0], image: 'uq-pc009.jpg' },
  { id: 'pc010', name: 'Bộ Mặc Nhà Kẻ Sọc Trẻ Em', price: 399000, type: 'nha', collections: ['gia-moi'], sizes: ['110', '120', '130', '140', '150', '160'], for: [2], image: 'pc010.jpg' },
  { id: 'pc011', name: 'Túi Đeo Vai Mini', price: 349000, type: 'phukien', collections: ['uu-dai'], for: [0, 1], image: 'uq-pc011-den.jpg' },
  { id: 'pc012', name: 'Áo Thun In Họa Tiết', price: 299000, type: 'hoa-tiet', for: [1], image: 'uq-pc012-den.jpg' },
  { id: 'pc013', name: 'Quần Thun Lưng Co Giãn Cho Bé', price: 299000, type: 'quan', collections: ['tap-di'], sizes: ['80', '90', '100', '110'], for: [3], image: 'uq-pc013-be.jpg' },
  { id: 'pc014', name: 'Bộ Tất Cotton', price: 99000, type: 'tat', collections: ['new'], for: [0, 1], image: 'uq-pc014-xam.jpg' },
  { id: 'pc015', name: 'Áo Hoodie Nỉ Mềm', price: 549000, type: 'sweat', collections: ['new'], for: [1], image: 'uq-pc015-xam.jpg' },
  { id: 'pc016', name: 'Áo Phao Dáng Ngắn', price: 1299000, type: 'khoac', collections: ['mua-dong', 'new'], for: [1], image: 'uq-pc016-tim.jpg' },
  { id: 'pc017', name: 'Áo Sơ Mi Kẻ Ô Flannel', price: 499000, type: 'somi', collections: ['mua-dong', 'uu-dai'], for: [0], image: 'uq-pc017-do.jpg' },
  { id: 'pc018', name: 'Áo Polo Dệt Piqué', price: 399000, type: 'polo', for: [1], image: 'uq-pc018-trang.jpg' },
  { id: 'pc019', name: 'Áo Thun Dài Tay Vải Gân', price: 299000, type: 'thun', for: [0], image: 'uq-pc019-phan.jpg' },
  { id: 'pc020', name: 'Áo Nỉ Cổ Tròn Dáng Rộng', price: 449000, type: 'sweat', collections: ['gia-moi'], for: [1], image: 'uq-pc020-do.jpg' },
  { id: 'pc021', name: 'Áo Fleece Cổ Cài Nút', price: 549000, type: 'fleece', collections: ['mua-dong'], for: [1], image: 'uq-pc021.jpg' },
  { id: 'pc022', name: 'Cardigan Dệt Sọc', price: 649000, type: 'len', collections: ['dac-biet'], for: [0], image: 'uq-pc022.jpg' },
  { id: 'pc023', name: 'Áo Len Cổ Lọ', price: 599000, type: 'len', collections: ['mua-dong'], for: [0], image: 'uq-pc023-den.jpg' },
  { id: 'pc024', name: 'Quần Jeans Ống Cong', price: 799000, type: 'quan', collections: ['new'], for: [0], image: 'uq-pc024.jpg' },
  { id: 'pc025', name: 'Quần Cargo Túi Hộp', price: 699000, type: 'quan', for: [1], image: 'uq-pc025.jpg' },
  { id: 'pc026', name: 'Chân Váy Xếp Ly Midi', price: 549000, type: 'dam', collections: ['new'], for: [0], image: 'uq-pc026-den.jpg' },
  { id: 'pc027', name: 'Đầm Yếm Denim Trẻ Em', price: 499000, type: 'dam', collections: ['new'], for: [2], image: 'uq-pc027-denim.jpg' },
  { id: 'pc028', name: 'Vớ Cổ Trung Kẻ Sọc', price: 79000, type: 'tat', collections: ['uu-dai'], for: [0, 1], image: 'uq-pc028-trang.jpg' },
  { id: 'pc029', name: 'Vớ Len Cổ Cao', price: 129000, type: 'tat', collections: ['giu-nhiet', 'mua-dong'], for: [0], image: 'uq-pc029.jpg' },
  { id: 'pc030', name: 'Bộ Pyjama Kẻ Caro', price: 499000, type: 'nha', for: [0], image: 'uq-pc030-navy.jpg' },
  { id: 'pc031', name: 'Bộ Mặc Nhà Satin Tay Ngắn', price: 469000, type: 'nha', collections: ['uu-dai'], for: [0], image: 'pc031.jpg' },
  { id: 'pc032', name: 'Mũ Len Gập Gấu', price: 199000, type: 'phukien', collections: ['mua-dong', 'restock'], for: [0, 1], image: 'uq-pc032-xanh.jpg' },
  { id: 'pc033', name: 'Khăn Quàng Sợi Mềm', price: 229000, type: 'phukien', collections: ['mua-dong'], for: [0, 1], image: 'uq-pc033-do.jpg' },
  { id: 'pc034', name: 'Quần Legging Giữ Ấm', price: 299000, type: 'quan', collections: ['giu-nhiet', 'mua-dong'], for: [0], image: 'uq-pc034-den.jpg' },
  { id: 'pc035', name: 'Áo Thể Thao Nhanh Khô', price: 349000, type: 'thun', collections: ['sport', 'gia-moi'], for: [0, 1], image: 'uq-pc035-den.jpg' },
  { id: 'pc036', name: 'Áo Thun In Chợ Phiên', price: 329000, type: 'hoa-tiet', collections: ['dac-biet'], for: [1], image: 'pc036.jpg' },
  { id: 'pc037', name: 'Bộ Liền Thân Cotton Sơ Sinh', price: 259000, type: 'bo-so-sinh', collections: ['new'], sizes: ['60', '70', '80', '90'], for: [3], image: 'uq-pc037-vang.jpg' },
  { id: 'pc038', name: 'Áo Khoác Chần Bông Em Bé', price: 429000, type: 'khoac', collections: ['tap-di', 'mua-dong', 'new'], sizes: ['80', '90', '100', '110'], for: [3], image: 'uq-pc038.jpg' },
  { id: 'pc039', name: 'Bộ Mặc Nhà Họa Tiết Táo Cho Bé', price: 289000, type: 'nha', collections: ['uu-dai', 'tap-di'], sizes: ['80', '90', '100', '110'], for: [3], image: 'pc039.jpg' },
  { id: 'pc040', name: 'Áo Polo Thể Thao Nhanh Khô', price: 389000, type: 'polo', collections: ['sport', 'gia-moi'], for: [1], image: 'uq-pc040.jpg' },
  { id: 'pc041', name: 'Legging Dài Họa Tiết Dáng Ôm Cho Bé', price: 99000, type: 'quan', collections: ['tap-di', 'uu-dai'], sizes: ['80', '90', '100', '110', '120'], for: [3], image: 'uq-pc041-phan.jpg' },
  { id: 'pc042', name: 'Legging Gân Dài Dáng Ôm Cho Bé', price: 99000, type: 'quan', collections: ['tap-di', 'uu-dai'], sizes: ['80', '90', '100', '110', '120'], for: [3], image: 'uq-pc042-den.jpg', bestseller: true },
  { id: 'pc043', name: 'Legging Dài Giả Denim Dáng Thoải Mái', price: 99000, type: 'quan', collections: ['tap-di', 'uu-dai'], sizes: ['80', '90', '100', '110', '120'], for: [3], image: 'uq-pc043-denim.jpg' },
  { id: 'pc044', name: 'Legging Dài Họa Tiết Khủng Long', price: 99000, type: 'quan', collections: ['tap-di', 'uu-dai'], sizes: ['80', '90', '100', '110', '120'], for: [3], image: 'uq-pc044-olive.jpg' },
  { id: 'pc045', name: 'Áo Nỉ Chú Sâu Háu Ăn', price: 349000, type: 'sweat', collections: ['tap-di', 'new'], sizes: ['80', '90', '100', '110'], for: [3], image: 'uq-pc045-kem.jpg' },
  { id: 'pc046', name: 'Áo Sơ Mi Oxford Nam', price: 499000, type: 'somi', for: [1], image: 'uq-pc006-navy.jpg' },
  { id: 'pc047', name: 'Áo Khoác Phao Trẻ Em', price: 699000, type: 'khoac', collections: ['mua-dong'], for: [2], image: 'uq-pc047-troi.jpg' },
  { id: 'pc048', name: 'Quần Jeans Trẻ Em', price: 449000, type: 'quan', collections: ['new'], for: [2], image: 'uq-pc048-denim.jpg' },
  { id: 'pc049', name: 'Áo Khoác Fleece Trẻ Em', price: 399000, type: 'khoac-fleece', collections: ['mua-dong'], for: [2], image: 'uq-pc049-phan.jpg' },
  { id: 'pc050', name: 'Áo Len Vải Sợi Mềm Nam', price: 599000, type: 'len', collections: ['mua-dong', 'new'], for: [1], image: 'banner-ao-len-vai-soi-mem.png' },
];

const babyLeggings = ['pc041', 'pc042', 'pc043', 'pc044'];

const colorPalette = {
  trang: ['Trắng', '#fff'],
  den: ['Đen', '#252525'],
  kem: ['Kem', '#eee4d3'],
  be: ['Be', '#c6ab90'],
  xam: ['Xám', '#96989b'],
  than: ['Xám than', '#525356'],
  navy: ['Xanh navy', '#343f58'],
  olive: ['Xanh olive', '#68705b'],
  xanh: ['Xanh cổ vịt', '#365765'],
  troi: ['Xanh da trời', '#9ab9d5'],
  denim: ['Xanh denim', '#5f7fa0'],
  chanh: ['Xanh chanh nhạt', '#cdd890'],
  hong: ['Hồng đất', '#b18182'],
  phan: ['Hồng phấn', '#efd0d5'],
  tim: ['Tím khói', '#8f7f9b'],
  do: ['Đỏ rượu', '#882e40'],
  nau: ['Nâu cacao', '#725047'],
  vang: ['Vàng bơ', '#ebd388'],
};

function variants(imagesByColor) {
  return Object.entries(imagesByColor).map(([id, image]) => {
    const [name, hex] = colorPalette[id];
    return { id, name, hex, image };
  });
}

// Điền tên tệp ảnh bên phải mã màu. Chuỗi rỗng sẽ dùng ảnh chung hoặc placeholder.
const productColors = {
  pc001: [
    { id: 'den', name: 'Đen', hex: '#252525', image: '' },
    { id: 'be', name: 'Be', hex: '#c6ab90', image: 'uq-pc001-be.jpg' },
    { id: 'olive', name: 'Xanh olive', hex: '#68705b', image: '' },
  ],
  pc002: [
    { id: 'kem', name: 'Kem', hex: '#eee4d3', image: 'uq-pc002-kem.jpg' },
    { id: 'hong', name: 'Hồng đất', hex: '#b18182', image: 'uq-pc002-hong.jpg' },
    { id: 'than', name: 'Xám than', hex: '#525356', image: 'uq-pc002-than.jpg' },
  ],
  pc003: [
    { id: 'trang', name: 'Trắng', hex: '#fff', image: 'uq-pc003-trang.jpg' },
    { id: 'den', name: 'Đen', hex: '#232323', image: 'uq-pc003-den.jpg' },
    { id: 'navy', name: 'Xanh navy', hex: '#343f58', image: 'uq-pc003-navy.jpg' },
    { id: 'phan', name: 'Hồng phấn', hex: '#efd0d5', image: '' },
    { id: 'troi', name: 'Xanh da trời', hex: '#9ab9d5', image: 'uq-pc003-troi.jpg' },
    { id: 'vang', name: 'Vàng bơ', hex: '#ebd388', image: '' },
  ],
  pc004: [
    { id: 'den', name: 'Đen', hex: '#252525', image: 'uq-pc004-den.jpg' },
    { id: 'be', name: 'Be', hex: '#c6ab90', image: '' },
  ],
  pc005: variants({ den: 'uq-pc005-den.jpg', troi: '', chanh: '', be: '' }),
  pc006: variants({ trang: 'uq-pc006-trang.jpg', troi: '', phan: '', navy: '', kem: '' }),
  pc007: variants({ den: 'uq-pc007-den.jpg', trang: '', than: '', do: '' }),
  pc008: variants({ kem: 'uq-pc008-kem.jpg', nau: 'uq-pc008-nau.jpg', olive: 'uq-pc008-olive.jpg' }),
  pc009: variants({ den: '', phan: '', xanh: '' }),
  pc010: variants({ be: 'pc010.jpg', denim: 'pc010-xanh.jpg' }),
  pc011: variants({ den: 'uq-pc011-den.jpg', kem: 'uq-pc011-kem.jpg', olive: '' }),
  pc012: variants({ trang: '', den: 'uq-pc012-den.jpg', vang: '', troi: '' }),
  pc013: variants({ xam: '', navy: 'uq-pc013-navy.jpg', be: 'uq-pc013-be.jpg' }),
  pc014: [
    { id: 'trang', name: 'Trắng', hex: '#fff', image: '' },
    { id: 'xam', name: 'Xám', hex: '#96989b', image: 'uq-pc014-xam.jpg' },
    { id: 'navy', name: 'Xanh navy', hex: '#343f58', image: '' },
  ],
  pc015: variants({ xam: 'uq-pc015-xam.jpg', den: 'uq-pc015-den.jpg', do: 'uq-pc015-do.jpg', olive: '' }),
  pc016: [
    { id: 'tim', name: 'Tím khói', hex: '#6e657e', image: 'uq-pc016-tim.jpg' },
    { id: 'kem', name: 'Kem', hex: '#ece4d6', image: '' },
    { id: 'den', name: 'Đen', hex: '#252525', image: 'uq-pc016-den.jpg' },
  ],
  pc017: variants({ do: 'uq-pc017-do.jpg', navy: 'uq-pc017-navy.jpg', nau: '', olive: '' }),
  pc018: variants({ trang: 'uq-pc018-trang.jpg', den: '', navy: 'uq-pc018-navy.jpg', olive: 'uq-pc018-olive.jpg', do: '' }),
  pc019: variants({ kem: 'uq-pc019-kem.jpg', phan: 'uq-pc019-phan.jpg', nau: 'uq-pc019-nau.jpg', den: 'uq-pc019-den.jpg' }),
  pc020: variants({ xam: '', kem: '', do: 'uq-pc020-do.jpg', xanh: '' }),
  pc021: variants({ kem: 'uq-pc021-kem.jpg', nau: '', xanh: '' }),
  pc022: variants({ kem: 'uq-pc022-kem.jpg', navy: '', do: '' }),
  pc023: variants({ den: 'uq-pc023-den.jpg', kem: 'uq-pc023-kem.jpg', nau: '', do: '' }),
  pc024: variants({ denim: '', navy: 'uq-pc024-navy.jpg', den: '' }),
  pc025: variants({ olive: '', be: '', den: 'uq-pc025-den.jpg' }),
  pc026: variants({ den: 'uq-pc026-den.jpg', xam: '', nau: 'uq-pc026-nau.jpg' }),
  pc027: variants({ denim: 'uq-pc027-denim.jpg', navy: '' }),
  pc028: [
    { id: 'trang', name: 'Trắng kẻ xanh', hex: '#f8f3ea', image: 'uq-pc028-trang.jpg' },
    { id: 'navy', name: 'Navy kẻ trắng', hex: '#33425b', image: '' },
    { id: 'do', name: 'Đỏ rượu', hex: '#882e40', image: '' },
  ],
  pc029: variants({ kem: 'uq-pc029-kem.jpg', than: 'uq-pc029-than.jpg', do: '', olive: '' }),
  pc030: variants({ do: '', navy: 'uq-pc030-navy.jpg', be: '' }),
  pc031: variants({ than: 'pc031.jpg', phan: 'pc031-hong.jpg' }),
  pc032: [
    { id: 'xanh', name: 'Xanh cổ vịt', hex: '#365765', image: 'uq-pc032-xanh.jpg' },
    { id: 'be', name: 'Be', hex: '#c6ab90', image: '' },
  ],
  pc033: variants({ be: 'uq-pc033-be.jpg', do: 'uq-pc033-do.jpg', xam: '', navy: '' }),
  pc034: variants({ den: 'uq-pc034-den.jpg', than: '', navy: '' }),
  pc035: variants({ den: 'uq-pc035-den.jpg', troi: 'uq-pc035-troi.jpg', chanh: 'uq-pc035-chanh.jpg', trang: 'uq-pc035-trang.jpg' }),
  pc036: variants({ trang: 'pc036.jpg', kem: '', den: '', xanh: '', vang: '' }),
  pc037: variants({ trang: '', phan: '', troi: '', vang: 'uq-pc037-vang.jpg' }),
  pc038: variants({ kem: '', troi: '', phan: '' }),
  pc039: [{ id: 'do', name: 'Trắng phối đỏ', hex: '#e33139', image: 'pc039.jpg' }],
  pc040: variants({ trang: 'uq-pc040-trang.jpg', navy: '', troi: '', xanh: '', xam: '' }),
  pc041: variants({ phan: 'uq-pc041-phan.jpg', kem: 'uq-pc041-kem.jpg' }),
  pc042: variants({ den: 'uq-pc042-den.jpg', trang: 'uq-pc042-trang.jpg', xam: 'uq-pc042-xam.jpg', phan: 'uq-pc042-phan.jpg', tim: 'uq-pc042-tim.jpg' }),
  pc043: variants({ denim: 'uq-pc043-denim.jpg', navy: 'uq-pc043-navy.jpg' }),
  pc044: [{ id: 'olive', name: 'Xanh lá họa tiết khủng long', hex: '#759264', image: 'uq-pc044-olive.jpg' }],
  pc045: variants({ kem: 'uq-pc045-kem.jpg', xam: 'uq-pc045-xam.jpg' }),
  pc046: variants({ navy: 'uq-pc006-navy.jpg', trang: '', troi: '', phan: '' }),
  pc047: variants({ troi: 'uq-pc047-troi.jpg', navy: '', phan: '' }),
  pc048: variants({ denim: 'uq-pc048-denim.jpg', navy: '', den: '' }),
  pc049: variants({ phan: 'uq-pc049-phan.jpg', troi: '', kem: '' }),
  pc050: variants({ navy: 'banner-ao-len-vai-soi-mem.png', xam: '', kem: '' }),
};
