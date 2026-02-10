export const getServiceCategory = (servicetype) => {
    if (!servicetype) return 'other';
    const lowerServiceType = servicetype.toLowerCase();

    if (lowerServiceType.includes('umzug') || lowerServiceType.includes('transport') || lowerServiceType.includes('klavier')) {
        return 'moving';
    }
    if (lowerServiceType.includes('reinigung')) {
        return 'cleaning';
    }
    if (lowerServiceType.includes('maler')) {
        return 'painting';
    }
    if (lowerServiceType.includes('räumung') || lowerServiceType.includes('entsorgung')) {
        return 'disposal';
    }
    return 'other';
};

export const isMovingService = (servicetype) => getServiceCategory(servicetype) === 'moving';
export const isCleaningService = (servicetype) => getServiceCategory(servicetype) === 'cleaning';
export const isPaintingService = (servicetype) => getServiceCategory(servicetype) === 'painting';
export const isDisposalService = (servicetype) => getServiceCategory(servicetype) === 'disposal';