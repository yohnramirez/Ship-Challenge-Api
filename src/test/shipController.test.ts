import { getInterpolatePressure } from "../controllers/shipController";
import { PHASES_DATA, VolumeResponse } from "../constants/phasesPressure";

describe("getInterpolatePressure", () => {
    
  test("should return correct interpolated values for pressure = 1", () => {
    const pressure = 1;
    const expected: VolumeResponse = {
      specific_volume_liquid: 0.0012839195979899498,
      specific_volume_vapor: 27.13601256281407,
    };

    const result = getInterpolatePressure(pressure, PHASES_DATA);

    expect(result).toBeDefined();
    expect(result!.specific_volume_liquid).toBeCloseTo(
      expected.specific_volume_liquid,
      10
    );
    expect(result!.specific_volume_vapor).toBeCloseTo(
      expected.specific_volume_vapor,
      10
    );
  });

  test("should return correct interpolated values for pressure = 10", () => {
    const pressure = 10;
    const expected: VolumeResponse = {
      specific_volume_liquid: 0.0035,
      specific_volume_vapor: 0.0035,
    };

    const result = getInterpolatePressure(pressure, PHASES_DATA);

    expect(result).toBeDefined();
    expect(result!.specific_volume_liquid).toBeCloseTo(
      expected.specific_volume_liquid,
      4
    );
    expect(result!.specific_volume_vapor).toBeCloseTo(
      expected.specific_volume_vapor,
      4
    );
  });

  test("should return null for pressure out of range", () => {
    const pressure = 50;
    const result = getInterpolatePressure(pressure, PHASES_DATA);
    expect(result).toBeNull();
  });

  test("should return exact value if pressure exists in data", () => {
    const pressure = 0.05;
    const result = getInterpolatePressure(pressure, PHASES_DATA);
    expect(result).toEqual(PHASES_DATA[pressure]);
  });
});
