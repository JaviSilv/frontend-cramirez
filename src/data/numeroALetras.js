export function numeroALetras(numero) {
    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    // Aseguramos que el número tenga 3 decimales
    const numeroStr = Number(numero).toFixed(3);
    const [parteEnteraStr, parteDecimalStr] = numeroStr.split('.');

    const parteEntera = parseInt(parteEnteraStr, 10);

    let letras = convertirEntero(parteEntera);

    if (parteDecimalStr && parseInt(parteDecimalStr) > 0) {
        letras += ' punto ' + convertirDecimalStr(parteDecimalStr);
    }

    return letras.trim();

    function convertirEntero(num) {
        if (num === 0) return 'cero';
        if (num === 100) return 'cien';

        let resultado = '';
        const miles = Math.floor(num / 1000);
        const resto = num % 1000;

        if (miles > 0) {
            if (miles === 1) {
                resultado += 'mil ';
            } else {
                resultado += convertirMenorA1000(miles) + ' mil ';
            }
        }

        if (resto > 0) {
            resultado += convertirMenorA1000(resto);
        }

        return resultado.trim();
    }

    function convertirMenorA1000(num) {
        if (num === 0) return '';
        if (num === 100) return 'cien';

        const c = Math.floor(num / 100);
        const d = Math.floor((num % 100) / 10);
        const u = num % 10;

        let resultado = '';
        if (c > 0) {
            resultado += centenas[c] + ' ';
        }

        const dosDigitos = num % 100;
        if (dosDigitos < 10) {
            resultado += unidades[dosDigitos];
        } else if (dosDigitos < 20) {
            resultado += especiales[dosDigitos - 10];
        } else {
            resultado += decenas[d];
            if (u !== 0) {
                resultado += ' y ' + unidades[u];
            }
        }

        return resultado.trim();
    }

    function convertirDecimalStr(decimalStr) {
        const decimalNum = parseInt(decimalStr.padEnd(3, '0'), 10);
        return convertirMenorA1000(decimalNum);
    }
}
