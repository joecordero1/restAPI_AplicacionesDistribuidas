const Intervencion = require('../models/Intervencion');
const Animal = require('../models/Animal');

// Datos ficticios de la ciudad vecina
const datosCiudadVecina = {
    2020: 15,
    2021: 20,
    2022: 30,
    2023: 49,
    2024: 55
};

// Definición de sectores (simplificada por cuadrantes)
const sectores = {
    'Centro Histórico': { latMin: 0, latMax: 10, lonMin: 0, lonMax: 10 },
    'La Mariscal': { latMin: 10, latMax: 20, lonMin: 5, lonMax: 15 },
    'La Floresta': { latMin: 5, latMax: 15, lonMin: 15, lonMax: 25 },
    'Guápulo': { latMin: 15, latMax: 25, lonMin: 20, lonMax: 30 },
    'González Suárez': { latMin: 20, latMax: 25, lonMin: 0, lonMax: 10 },
    'Cumbayá y Tumbaco': { latMin: 40, latMax: 50, lonMin: 26, lonMax: 40 },
    'El Batán': { latMin: 30, latMax: 39, lonMin: 27, lonMax: 37 },
    'El Inca': { latMin: 30, latMax: 40, lonMin: 0, lonMax: 10 },
    'La Carolina': { latMin: 41, latMax: 50, lonMin: 10, lonMax: 20 },
    'La Concepción': { latMin: 50, latMax: 60, lonMin: 0, lonMax: 10 },
    'Carcelén': { latMin: 61, latMax: 81, lonMin: 10, lonMax: 20 },
    'Quito Norte': { latMin: 61, latMax: 81, lonMin: -30, lonMax: -1 },
    'Quito Sur': { latMin: -23, latMax: -50, lonMin: -10, lonMax: 10 },
    'Chillogallo': { latMin: -11, latMax: -22, lonMin: -5, lonMax: 5 },
    'San Juan': { latMin: -1, latMax: -10, lonMin: -11, lonMax: -1 }
};
// Calcular mejoras anuales para todos los animales
async function calcularMejorasAnuales(inicio, fin) {
    try {
        console.log(`Calculando mejoras anuales desde ${inicio} hasta ${fin}`);
        const intervenciones = await Intervencion.find({
            fecha: { $gte: inicio, $lte: fin }
        });

        console.log(`Intervenciones encontradas: ${intervenciones.length}`);

        const totalMejora = intervenciones.reduce((acc, intervencion) => {
            return acc + (intervencion.resultadoDespues - intervencion.resultadoAntes);
        }, 0);

        console.log(`Total mejora calculada: ${totalMejora}`);

        return { totalMejora };
    } catch (error) {
        console.error('Error calculando mejoras anuales:', error);
        throw error;
    }
}

// Comparar mejoras anuales con datos de la ciudad vecina
async function compararMejorasCiudadVecina(ano) {
    try {
        const inicio = new Date(`${ano}-01-01`);
        const fin = new Date(`${ano}-12-31`);

        console.log(`Comparando mejoras anuales desde ${inicio} hasta ${fin}`);

        const intervenciones = await Intervencion.find({
            fecha: { $gte: inicio, $lte: fin }
        });

        console.log(`Intervenciones encontradas: ${intervenciones.length}`);

        const totalMejora = intervenciones.reduce((acc, intervencion) => {
            return acc + (intervencion.resultadoDespues - intervencion.resultadoAntes);
        }, 0);

        console.log(`Total mejora calculada: ${totalMejora}`);

        const mejoraVecina = datosCiudadVecina[ano] || 100;

        const porcentajeAlcanzado = (totalMejora / mejoraVecina) * 100;
        const faltanteParaAlcanzar = mejoraVecina - totalMejora;

        console.log(`Mejora vecina: ${mejoraVecina}, Porcentaje alcanzado: ${porcentajeAlcanzado}, Faltante para alcanzar: ${faltanteParaAlcanzar}`);

        return { totalMejora, mejoraVecina, porcentajeAlcanzado, faltanteParaAlcanzar };
    } catch (error) {
        console.error('Error comparando mejoras anuales con ciudad vecina:', error);
        throw error;
    }
}

// Función para segmentar datos por criterio
async function segmentarDatosPorCriterio(criterio) {
    try {
        const intervenciones = await Intervencion.find({});
        const segmentos = {};

        for (const intervencion of intervenciones) {
            const animal = await Animal.findById(intervencion.Id_Animal).populate('estados.estado', 'nombre');
            
            console.log('Estados del animal:', animal.estados);
            let clave = '';

            switch (criterio) {
                case 'raza':
                    clave = animal.Id_Raza.toString();
                    break;
                case 'sexo':
                    clave = animal.Id_Sexo.toString();
                    break;
                case 'edad':
                    clave = animal.Edad;
                    break;
                case 'Esterilizado':
                    const estadoEsterilizado = animal.estados.find(estado => estado.estado === '665e5bf16a7c4816aba78ddf');
                    clave = estadoEsterilizado ? 'Esterilizado' : 'No Esterilizado';
                    break;
                case 'Adoptado':
                    const estadoAdoptado = animal.estados.find(estado => estado.estado === '665e5bc76a7c4816aba78dd5');
                    clave = estadoAdoptado ? 'Adoptado' : 'No Adoptado';
                    break;
                case 'Desparacitado':
                    const estadoDesparacitado = animal.estados.find(estado => estado.estado === '665e689b0f223d9c71137ddf');
                    clave = estadoDesparacitado ? 'Desparacitado' : 'No Desparacitado';
                    break;
                default:
                    throw new Error('Criterio de segmentación no válido');
            }

            if (!segmentos[clave]) {
                segmentos[clave] = [];
            }

            segmentos[clave].push(intervencion);
        }

        const mejorasSegmentadas = {};

        for (const segmento in segmentos) {
            const intervencionesSegmento = segmentos[segmento];
            let totalMejora = 0;

            for (const intervencion of intervencionesSegmento) {
                totalMejora += intervencion.resultadoDespues - intervencion.resultadoAntes;
            }

            mejorasSegmentadas[segmento] = totalMejora;
        }

        return mejorasSegmentadas;
    } catch (error) {
        console.error('Error segmentando datos:', error);
        throw error;
    }
}

function determinarSector(coordinates) {
    for (const [sector, limites] of Object.entries(sectores)) {
        const [lon, lat] = coordinates;
        if (
            lat >= limites.latMin &&
            lat < limites.latMax &&
            lon >= limites.lonMin &&
            lon < limites.lonMax
        ) {
            return sector;
        }
    }
    return 'Sector Desconocido';
}

async function analisisSectorialYTemporal(fechaInicio, fechaFin) {
    try {
        const animales = await Animal.find({});
        const resultadosPorFechaYSector = {};

        for (const animal of animales) {
            const sector = determinarSector(animal.ubicacion.coordinates);
            const intervenciones = await Intervencion.find({
                Id_Animal: animal._id,
                fecha: { $gte: fechaInicio, $lte: fechaFin }
            });

            for (const intervencion of intervenciones) {
                const fecha = intervencion.fecha.toISOString().split('T')[0];
                if (!resultadosPorFechaYSector[fecha]) {
                    resultadosPorFechaYSector[fecha] = {};
                }
                if (!resultadosPorFechaYSector[fecha][sector]) {
                    resultadosPorFechaYSector[fecha][sector] = { totalMejora: 0, intervenciones: 0 };
                }

                resultadosPorFechaYSector[fecha][sector].totalMejora += intervencion.resultadoDespues - intervencion.resultadoAntes;
                resultadosPorFechaYSector[fecha][sector].intervenciones += 1; //cont
            }
        }

        return resultadosPorFechaYSector;
    } catch (error) {
        console.error('Error en el análisis sectorial y temporal:', error);
        throw error;
    }
}

// Función para calcular mejoras por sector específico
async function calcularMejorasPorSector(fechaInicio, fechaFin, sector) {
    try {
        const intervenciones = await Intervencion.find({
            fecha: { $gte: fechaInicio, $lte: fechaFin }
        });

        const sectorConfig = sectores[sector];
        if (!sectorConfig) {
            throw new Error('Sector no válido');
        }

        const { latMin, latMax, lonMin, lonMax } = sectorConfig;
        const resultados = {
            totalMejora: 0,
            intervenciones: [],
            razas: {} // guarda las razas
        };

        for (const intervencion of intervenciones) {
            const animal = await Animal.findById(intervencion.Id_Animal).populate('Id_Raza', 'nombre');
            if (!animal) {
                console.error(`Animal con ID ${intervencion.Id_Animal} no encontrado`);
                continue;
            }

            const [lon, lat] = animal.ubicacion.coordinates;

            if (lat >= latMin && lat <= latMax && lon >= lonMin && lon <= lonMax) {
                resultados.totalMejora += intervencion.resultadoDespues - intervencion.resultadoAntes;
                resultados.intervenciones.push(intervencion);

                //reto core
                if (animal.Id_Raza && animal.Id_Raza._id) {
                    const razaId = animal.Id_Raza._id.toString();
                    const razaNombre = animal.Id_Raza.nombre;
                    if (!resultados.razas[razaId]) {
                        resultados.razas[razaId] = {
                            nombreRaza: razaNombre,
                            contador: 0
                        };
                    }
                    resultados.razas[razaId].contador += 1;
                } else {
                    console.error(`Raza no encontrada para el animal con ID ${animal._id}`);
                }
            }
        }

        return resultados;
    } catch (error) {
        console.error('Error calculando mejoras por sector:', error);
        throw error;
    }
}

// Función para calcular el nivel de mejora basado en la rúbrica
async function calcularNivelMejora (mejoraActual, mejoraAnterior) {
    const porcentajeMejora = (mejoraActual / mejoraAnterior) * 100;
    let nivel = '';

    if (porcentajeMejora < 20) {
        nivel = 'Muy Baja';
    } else if (porcentajeMejora >= 20 && porcentajeMejora < 50) {
        nivel = 'Baja';
    } else if (porcentajeMejora >= 50 && porcentajeMejora < 80) {
        nivel = 'Moderada';
    } else if (porcentajeMejora >= 80 && porcentajeMejora < 100) {
        nivel = 'Alta';
    } else {
        nivel = 'Muy Alta';
    }

    return nivel;
};

module.exports = {
    calcularMejorasAnuales,
    compararMejorasCiudadVecina,
    segmentarDatosPorCriterio,
    analisisSectorialYTemporal,
    calcularMejorasPorSector,
    calcularNivelMejora
};
