export type VolumeResponse = {
    specific_volume_liquid: number,
    specific_volume_vapor: number
}

export const PHASES_DATA: Record<number, VolumeResponse> = {
    0.05: { specific_volume_liquid: 0.00105, specific_volume_vapor: 30.00 },
    10: { specific_volume_liquid: 0.0035, specific_volume_vapor: 0.0035 }
}