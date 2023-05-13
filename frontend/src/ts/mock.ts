export const createMockFn = () => {
    let callCount = 0;
    const mockFn = (...args: any[]) => {
        callCount++;
    };
    mockFn.mock = {
        calls: new Array<any>(),
        results: new Array<any>(),
    };
    Object.defineProperty(mockFn, "mock", {
        get() {
            return {
                calls: [...mockFn.mock.calls],
                results: [...mockFn.mock.results],
            };
        },
    });
    Object.defineProperty(mockFn, "mockImplementation", {
        value(fn: (...args: any[]) => any) {
            mockFn.mock.calls.length = 0;
            mockFn.mock.calls = [];
            mockFn.mock.results = [];
            mockFn.mock.calls.push(...arguments);
            return mockFn;
        },
    });
    Object.defineProperty(mockFn, "mockReset", {
        value() {
            mockFn.mock.calls.length = 0;
            mockFn.mock.calls = [];
            mockFn.mock.results = [];
        },
    });
    Object.defineProperty(mockFn, "mockReturnValueOnce", {
        value(value: any) {
            mockFn.mock.results.push({
                type: "return",
                value,
            });
            return mockFn;
        },
    });
    Object.defineProperty(mockFn, "mockResolvedValueOnce", {
        value(value: any) {
            mockFn.mock.results.push({
                type: "resolve",
                value: Promise.resolve(value),
            });
            return mockFn;
        },
    });
    Object.defineProperty(mockFn, "mockRejectedValueOnce", {
        value(value: any) {
            mockFn.mock.results.push({
                type: "reject",
                value: Promise.reject(value),
            });
            return mockFn;
        },
    });
    return mockFn;
};
