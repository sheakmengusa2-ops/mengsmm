export type ThemeName = 'indigo' | 'blue' | 'green' | 'rose' | 'orange' | 'slate';

type ColorPalette = {
    [key: string]: string;
};

interface Theme {
    name: ThemeName;
    colors: ColorPalette;
}

export const THEMES: Theme[] = [
    {
        name: 'indigo',
        colors: {
            '--color-primary-50': '245 243 255',
            '--color-primary-100': '237 233 254',
            '--color-primary-200': '221 214 254',
            '--color-primary-300': '196 181 253',
            '--color-primary-400': '167 139 250',
            '--color-primary-500': '139 92 246',
            '--color-primary-600': '124 58 237',
            '--color-primary-700': '109 40 217',
            '--color-primary-800': '91 33 182',
            '--color-primary-900': '76 29 149',
            '--color-primary-950': '46 16 101',
        },
    },
    {
        name: 'blue',
        colors: {
            '--color-primary-50': '239 246 255',
            '--color-primary-100': '219 234 254',
            '--color-primary-200': '191 219 254',
            '--color-primary-300': '147 197 253',
            '--color-primary-400': '96 165 250',
            '--color-primary-500': '59 130 246',
            '--color-primary-600': '37 99 235',
            '--color-primary-700': '29 78 216',
            '--color-primary-800': '30 64 175',
            '--color-primary-900': '30 58 138',
            '--color-primary-950': '23 37 84',
        },
    },
    {
        name: 'green',
        colors: {
            '--color-primary-50': '240 253 244',
            '--color-primary-100': '220 252 231',
            '--color-primary-200': '187 247 208',
            '--color-primary-300': '134 239 172',
            '--color-primary-400': '74 222 128',
            '--color-primary-500': '34 197 94',
            '--color-primary-600': '22 163 74',
            '--color-primary-700': '21 128 61',
            '--color-primary-800': '22 101 52',
            '--color-primary-900': '20 83 45',
            '--color-primary-950': '5 46 22',
        },
    },
    {
        name: 'rose',
        colors: {
            '--color-primary-50': '255 241 242',
            '--color-primary-100': '255 228 230',
            '--color-primary-200': '254 205 211',
            '--color-primary-300': '253 164 175',
            '--color-primary-400': '251 113 133',
            '--color-primary-500': '244 63 94',
            '--color-primary-600': '225 29 72',
            '--color-primary-700': '190 18 60',
            '--color-primary-800': '159 18 57',
            '--color-primary-900': '136 19 55',
            '--color-primary-950': '76 5 25',
        },
    },
    {
        name: 'orange',
        colors: {
            '--color-primary-50': '255 247 237',
            '--color-primary-100': '255 237 213',
            '--color-primary-200': '254 215 170',
            '--color-primary-300': '253 186 116',
            '--color-primary-400': '251 146 60',
            '--color-primary-500': '249 115 22',
            '--color-primary-600': '234 88 12',
            '--color-primary-700': '194 65 12',
            '--color-primary-800': '154 52 18',
            '--color-primary-900': '124 45 18',
            '--color-primary-950': '67 20 7',
        },
    },
    {
        name: 'slate',
        colors: {
            '--color-primary-50': '248 250 252',
            '--color-primary-100': '241 245 249',
            '--color-primary-200': '226 232 240',
            '--color-primary-300': '203 213 225',
            '--color-primary-400': '148 163 184',
            '--color-primary-500': '100 116 139',
            '--color-primary-600': '71 85 105',
            '--color-primary-700': '51 65 85',
            '--color-primary-800': '30 41 59',
            '--color-primary-900': '15 23 42',
            '--color-primary-950': '2 6 23',
        },
    },
];