var CHEMICAL_ELEMENTS = {
  0: {
    'name': 'n/a',
    'symbol': "",
    'background-color': '#F1EEFA',
    'border-color': '#AAA',
    'color': '#F1EEFA',
    'descrip': ""
  },

  1: {
    'name': 'hydrogen',
    'symbol': 'H',
    'background-color': '#DBC3DB',
    'border-color': '#A971A9',
    'color': 'black',
    'descrip': ""
  },

  2: {
    'name': 'helium',
    'symbol': 'He',
    'background-color': '#EFE09F',
    'border-color': '#FF9830',
    'color': 'black',
    'descrip': ""
  },

  3: {
    'name': 'lithium',
    'symbol': 'Li',
    'background-color': '#E4E4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Named after the Greek for \"stone\"."
  },

  4: {
    'name': 'beryllium',
    'symbol': 'Be',
    'background-color': '#DEDEDA',
    'border-color': '#50506A',
    'color': 'black',
    'descrip': ""
  },

  5: {
    'name': 'boron',
    'symbol': 'B',
    'background-color': '#ACAFA0',
    'border-color': '#876750',
    'color': 'black',
    'descrip': ""
  },

  6: {
    'name': 'carbon',
    'symbol': 'C',
    'background-color': '#625858',
    'border-color': '#121212',
    'color': 'black',
    'descrip': "Typically manifests in coal, graphite, and diamond."
  },

  7: {
    'name': 'nitrogen',
    'symbol': 'N',
    'background-color': '#FFF',
    'border-color': '#999',
    'color': 'black',
    'descrip': "Makes up the largest percent of air at the Earth's surface."
  },

  8: {
    'name': 'oxygen',
    'symbol': 'O',
    'background-color': '#C1C5DB',
    'border-color': '#9093A9',
    'color': 'black',
    'descrip': "Makes up the second largest percent of air at the Earth's surface. Named after the Greek root for 'sour' or 'sharp', because the scientist who identified it believed Oxygen to be the key component of all acids."
  },

  9: {
    'name': 'fluorine',
    'symbol': 'F',
    'background-color': '#FFEF82',
    'border-color': '#B8B870',
    'color': 'black',
    'descrip': "Named after the word \"flow\"."
  },

  10: {
    'name': 'neon',
    'symbol': 'Ne',
    'background-color': '#EFE09F',
    'border-color': '#EFB830',
    'color': 'black',
    'descrip': "Named after the Latin word for \"new\"."
  },

  11: {
    'name': 'sodium',
    'symbol': 'Na',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Commonly found in table salt, in the compound Sodium Chloride ( NaCl )."
  },

  12: {
    'name': 'magnesium',
    'symbol': 'Mg',
    'background-color': '#EFEFFF',
    'border-color': '#656478',
    'color': 'black',
    'descrip': ""
  },

  13: {
    'name': 'aluminum',
    'symbol': 'Al',
    'background-color': '#E0E0F3',
    'border-color': '#656070',
    'color': 'black',
    'descrip': "Named for the salt from which it was derived: Alum. Once a very precious metal, so much so that the Washington Monument was originally capped with Aluminum."
  },

  14: {
    'name': 'silicon',
    'symbol': 'Si',
    'background-color': '#DEDEDA',
    'border-color': '#50506A',
    'color': 'black',
    'descrip': "Common component in electronics, as its chemical properties are ideal for creating microscopic transistors."
  },

  15: {
    'name': 'phosphorus',
    'symbol': 'P',
    'background-color': '#F5D311',
    'border-color': '#877040',
    'color': 'black',
    'descrip': ""
  },

  16: {
    'name': 'sulfur',
    'symbol': 'S',
    'background-color': '#F5D311',
    'border-color': '#877040',
    'color': 'black',
    'descrip': "Known as \"brimstone\" in ancient times. A key component in gunpowder."
  },

  17: {
    'name': 'chlorine',
    'symbol': 'Cl',
    'background-color': '#EFDF82',
    'border-color': '#989840',
    'color': 'black',
    'descrip': ""
  },

  18: {
    'name': 'argon',
    'symbol': 'Ar',
    'background-color': '#BBA3BB',
    'border-color': '#A971A9',
    'color': 'black',
    'descrip': ""
  },

  19: {
    'name': 'potassium',
    'symbol': 'K',
    'background-color': '#FFDFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Commonly found in bananas and potatoes."
  },

  20: {
    'name': 'calcium',
    'symbol': 'Ca',
    'background-color': '#E4E4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Typically found in limestone, from which it gets its \"name\"."
  },

  21: {
    'name': 'scandium',
    'symbol': 'Sc',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the country of Scandinavia."
  },

  22: {
    'name': 'titanium',
    'symbol': 'Ti',
    'background-color': '#E4E4DA',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  23: {
    'name': 'vanadium',
    'symbol': 'V',
    'background-color': '#C1C5DB',
    'border-color': '#9093A9',
    'color': 'black',
    'descrip': ""
  },

  24: {
    'name': 'chromium',
    'symbol': 'Cr',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  25: {
    'name': 'manganese',
    'symbol': 'Mn',
    'background-color': '#E4E4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Named for its magnetic properties."
  },

  26: {
    'name': 'iron',
    'symbol': 'Fe',
    'background-color': '#E4E4DA',
    'border-color': '#BF9270',
    'color': 'black',
    'descrip': ""
  },

  27: {
    'name': 'cobalt',
    'symbol': 'Co',
    'background-color': '#9EA3BB',
    'border-color': '#6871A9',
    'color': 'black',
    'descrip': ""
  },

  28: {
    'name': 'nickel',
    'symbol': 'Ni',
    'background-color': '#E4E4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': ""
  },

  29: {
    'name': 'copper',
    'symbol': 'Cu',
    'background-color': '#DFCE8F',
    'border-color': '#BF8230',
    'color': 'black',
    'descrip': "It's chemical symbol derives from the Latin 'Cuprus'."
  },

  30: {
    'name': 'zinc',
    'symbol': 'Zn',
    'background-color': '#C1C5DB',
    'border-color': '#9093A9',
    'color': 'black',
    'descrip': ""
  },

  31: {
    'name': 'gallium',
    'symbol': 'Ga',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the ancient Celtic peoples who inhabited what is now France, Gaul."
  },

  32: {
    'name': 'germanium',
    'symbol': 'Ge',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': 'Named after the country of Germany.'
  },

  33: {
    'name': 'arsenic',
    'symbol': 'As',
    'background-color': '#EFDF82',
    'border-color': '#989840',
    'color': 'black',
    'descrip': "Deadly poison to humans, named for its yellow color."
  },

  34: {
    'name': 'selenium',
    'symbol': 'Se',
    'background-color': '#EF9F9F',
    'border-color': '#EF5C30',
    'color': 'black',
    'descrip': ""
  },

  35: {
    'name': 'bromine',
    'symbol': 'Br',
    'background-color': '#EF8F8F',
    'border-color': '#CF3C20',
    'color': 'black',
    'descrip': "Named after the Greek for \"\" ( bad smell )."
  },

  36: {
    'name': 'krypton',
    'symbol': 'Kr',
    'background-color': '#FFDFEF',
    'border-color': '#9093A9',
    'color': 'black',
    'descrip': "Named after the Greek for \"hidden\"."
  },

  37: {
    'name': 'rubidium',
    'symbol': 'Rb',
    'background-color': '#E4C4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Named for it's \"ruby red\" color."
  },

  38: {
    'name': 'strontium',
    'symbol': 'Sr',
    'background-color': '#EFEFB2',
    'border-color': '#656463',
    'color': 'black',
    'descrip': ""
  },

  39: {
    'name': 'yttrium',
    'symbol': 'Y',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the village of Ytterby."
  },

  40: {
    'name': 'zirconium',
    'symbol': 'Zr',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': ""
  },

  41: {
    'name': 'niobium',
    'symbol': 'Nb',
    'background-color': '#C1C5DB',
    'border-color': '#707389',
    'color': 'black',
    'descrip': "Named after the city of Niobe."
  },

  42: {
    'name': 'molybdenum',
    'symbol': 'Mo',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Also known as \"fool's lead\"."
  },

  43: {
    'name': 'technetium',
    'symbol': 'Tc',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': ""
  },

  44: {
    'name': 'ruthenium',
    'symbol': 'Ru',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': ""
  },

  45: {
    'name': 'rhodium',
    'symbol': 'Rh',
    'background-color': '#FFDFEF',
    'border-color': '#616063',
    'color': 'black',
    'descrip': "Named for its pink color."
  },

  46: {
    'name': 'palladium',
    'symbol': 'Pd',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  47: {
    'name': 'silver',
    'symbol': 'Ag',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Its chemical symbol derives from the Latin \"argent\"."
  },

  48: {
    'name': 'cadmium',
    'symbol': 'Cd',
    'background-color': '#C1C5DB',
    'border-color': '#707399',
    'color': 'black',
    'descrip': ""
  },

  49: {
    'name': 'indium',
    'symbol': 'In',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the country of India."
  },

  50: {
    'name': 'tin',
    'symbol': 'Sn',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  51: {
    'name': 'antimony',
    'symbol': 'Sb',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Known during the Medieval Era to be the death of many monks who did not take enough care while gardening."
  },

  52: {
    'name': 'tellurium',
    'symbol': 'Te',
    'background-color': '#C7A770',
    'border-color': '#876730',
    'color': 'black',
    'descrip': ""
  },

  53: {
    'name': 'iodine',
    'symbol': 'I',
    'background-color': '#DF8F9F',
    'border-color': '#876730',
    'color': 'black',
    'descrip': "Named for its dark purple color."
  },

  54: {
    'name': 'xenon',
    'symbol': 'Xe',
    'background-color': '#EFDFEF',
    'border-color': '#9093A9',
    'color': 'black',
    'descrip': ""
  },

  55: {
    'name': 'caesium',
    'symbol': 'Cs',
    'background-color': '#F5F391',
    'border-color': '#838260',
    'color': 'black',
    'descrip': "Named for its sky blue color."
  },

  56: {
    'name': 'barium',
    'symbol': 'Ba',
    'background-color': '#EFEFB2',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the word for \"heavy\"."
  },

  57: {
    'name': 'lanthanum',
    'symbol': 'La',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  58: {
    'name': 'cerium',
    'symbol': 'Ce',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the word for \"farm\"."
  },

  59: {
    'name': 'praseodymium',
    'symbol': 'Pr',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': ""
  },

  60: {
    'name': 'neodymium',
    'symbol': 'Nd',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  61: {
    'name': 'promethium',
    'symbol': 'Pm',
    'background-color': '#EFEFFF',
    'border-color': '#656478',
    'color': 'black',
    'descrip': "Named after the tragic Greek hero Prometheus."
  },

  62: {
    'name': 'samarium',
    'symbol': 'Sm',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  63: {
    'name': 'europium',
    'symbol': 'Eu',
    'background-color': '#EFEFB2',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the continent of Europe."
  },

  64: {
    'name': 'gadolinium',
    'symbol': 'Gd',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  65: {
    'name': 'terbium',
    'symbol': 'Tb',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the village of Ytterby."
  },

  66: {
    'name': 'dysprosium',
    'symbol': 'Dy',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named for being difficult to acquire."
  },

  67: {
    'name': 'holmium',
    'symbol': 'Ho',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the city of Stockholm, Sweden."
  },

  68: {
    'name': 'erbium',
    'symbol': 'Er',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the village of Ytterby."
  },

  69: {
    'name': 'thulium',
    'symbol': 'Tm',
    'background-color': '#E4E4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Named after the country of Iceland."
  },

  70: {
    'name': 'ytterbium',
    'symbol': 'Yb',
    'background-color': '#EFEFB2',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named after the village of Ytterby."
  },

  71: {
    'name': 'lutetium',
    'symbol': 'Lu',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the original \"name\" of the city of Paris, Lutetia Parisii. 'Lutetia' may refer to the once swamp-like quality of the region."
  },

  72: {
    'name': 'hafnum',
    'symbol': 'Hf',
    'background-color': '#E4E4DA',
    'border-color': '#505057',
    'color': 'black',
    'descrip': "Named after the city of Copenhagen, Switzerland."
  },

  73: {
    'name': 'tantalum',
    'symbol': 'Ta',
    'background-color': '#C1C5DB',
    'border-color': '#707389',
    'color': 'black',
    'descrip': "Named for the mythical Greek Tantalus: a region deep beneath the surface of the Earth, where Zeus banished the titans."
  },

  74: {
    'name': 'tungsten',
    'symbol': 'W',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Also known as \"Wolfram\", from which it derives its chemical symbol."
  },

  75: {
    'name': 'rhenium',
    'symbol': 'Re',
    'background-color': '#DEDEDA',
    'border-color': '#50506A',
    'color': 'black',
    'descrip': "Named after the Rhine river."
  },

  76: {
    'name': 'osmium',
    'symbol': 'Os',
    'background-color': '#DEDEDA',
    'border-color': '#50508A',
    'color': 'black',
    'descrip': "Named for its smell."
  },

  77: {
    'name': 'iridium',
    'symbol': 'Ir',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  78: {
    'name': 'platinum',
    'symbol': 'Pt',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named \"little silver\"."
  },

  79: {
    'name': 'gold',
    'symbol': 'Au',
    'background-color': '#EFEF62',
    'border-color': '#A89840',
    'color': 'black',
    'descrip': ""
  },

  80: {
    'name': 'mercury',
    'symbol': 'Hg',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Also known as 'quicksilver'. Its chemical symbol derives from ."
  },

  81: {
    'name': 'thallium',
    'symbol': 'Tl',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  82: {
    'name': 'lead',
    'symbol': 'Pb',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': ""
  },

  83: {
    'name': 'bismuth',
    'symbol': 'Bi',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  84: {
    'name': 'polonium',
    'symbol': 'Po',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Discovered by Marie Curie, and named after her home country, Poland."
  },

  85: {
    'name': 'astatine',
    'symbol': 'At',
    'background-color': '#CDCDC0',
    'border-color': '#9D9D90',
    'color': 'black',
    'descrip': ""
  },

  86: {
    'name': 'radon',
    'symbol': 'Rn',
    'background-color': '#FFF',
    'border-color': '#999',
    'color': 'black',
    'descrip': "Named for its radioactive, \"glowing\" properties."
  },

  87: {
    'name': 'francium',
    'symbol': 'Fr',
    'background-color': '#EFEFEF',
    'border-color': '#656463',
    'color': 'black',
    'descrip': "Named for the country of France."
  },

  88: {
    'name': 'radium',
    'symbol': 'Ra',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named for its radioactive properties."
  },

  89: {
    'name': 'actinium',
    'symbol': 'Ac',
    'background-color': '#DEDEDD',
    'border-color': '#50508A',
    'color': 'black',
    'descrip': ""
  },

  90: {
    'name': 'thorium',
    'symbol': 'Th',
    'background-color': '#EFEFEF',
    'border-color': '#555',
    'color': 'black',
    'descrip': "Named after the Norse god, Thor."
  },

  91: {
    'name': 'proactinium',
    'symbol': 'Pa',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  92: {
    'name': 'uranium',
    'symbol': 'U',
    'background-color': '#EFEFEF',
    'border-color': '#555',
    'color': 'black',
    'descrip': "Named after the Roman god, Uranus, often equated to the Greek Ouranos."
  },

  93: {
    'name': 'neptunium',
    'symbol': 'Np',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Roman god, Neptune."
  },

  94: {
    'name': 'plutonium',
    'symbol': 'Pu',
    'background-color': '#FAFAFA',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the Roman god, Pluto."
  },

  95: {
    'name': 'americanium',
    'symbol': 'Am',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the country of the United States of America."
  },

  96: {
    'name': 'curium',
    'symbol': 'Cm',
    'background-color': '#FAFAFA',
    'border-color': '#A971A9',
    'color': 'black',
    'descrip': "Named after Marie Curie."
  },

  97: {
    'name': 'berkelium',
    'symbol': 'Bk',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named \"birch tree\"."
  },

  98: {
    'name': 'californium',
    'symbol': 'Cf',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the US state, California."
  },

  99: {
    'name': 'einsteinium',
    'symbol': 'Es',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the physicist, Albert Einstein."
  },

  100: {
    'name': 'fermium',
    'symbol': 'Fm',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the _, Enrico Fermi."
  },

  101: {
    'name': 'mendelevium',
    'symbol': 'Md',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the chemist who devised what would become the modern periodic table of elements, Mendeleev."
  },

  102: {
    'name': 'nobelium',
    'symbol': 'No',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the _, Nobel."
  },

  103: {
    'name': 'lawrencium',
    'symbol': 'Lr',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the _, Lawrence."
  },

  104: {
    'name': 'rutherford',
    'symbol': 'Rf',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the physicist, Ernst Rutherford."
  },

  105: {
    'name': 'dubnium',
    'symbol': 'Db',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  106: {
    'name': 'seaborgium',
    'symbol': 'Sg',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the _, Seaborg."
  },

  107: {
    'name': 'bohrium',
    'symbol': 'Bh',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the physicist, Niels Bohr."
  },

  108: {
    'name': 'hassium',
    'symbol': 'Hs',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  109: {
    'name': 'meitnerium',
    'symbol': 'Mt',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  110: {
    'name': 'darmstadtium',
    'symbol': 'Ds',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  111: {
    'name': 'roentgenium',
    'symbol': 'Rg',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  112: {
    'name': 'copernicium',
    'symbol': 'Cn',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': "Named after the philosopher, Copernicus."
  },

  113: {
    'name': 'ununtrium',
    'symbol': 'Uut',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  114: {
    'name': 'flerovium',
    'symbol': 'Fl',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  115: {
    'name': 'ununpentium',
    'symbol': 'Uup',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  116: {
    'name': 'livermorium',
    'symbol': 'Lv',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  117: {
    'name': 'ununseptium',
    'symbol': 'Uus',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },

  118: {
    'name': 'ununoctium',
    'symbol': 'Uuo',
    'background-color': '#EFEFEF',
    'border-color': '#818083',
    'color': 'black',
    'descrip': ""
  },
};
