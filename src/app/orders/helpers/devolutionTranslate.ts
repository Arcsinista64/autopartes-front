/**
 * Translates status from english to spanish using a map
 * @param status in english
 * @returns status in spanish
 */
function translateDevo(status: string): string {
    const devolutionMap = new Map([
        ['initial', 'Iniciado'],
        ['processing', 'En proceso'],
        ['shipped', 'Enviado'],
        ['received', 'Recibido'],
        ['cancelled', 'Cancelado'],
        ['completed', 'Completado'],
    ]);

    return devolutionMap.get(status) as string;
}

export default translateDevo;
