import { Address, beginCell, Cell, contractAddress } from "ton-core";
import { defaultConfig } from "../utils/defaultConfig";
import { EmulatorBindings } from "./EmulatorBindings";

const echoCode = 'te6ccgECIgEAAoYAART/APSkE/S88sgLAQIBYgIDAgLLBAUCAVgeHwIBIAYHAgFIFBUCASAICQIBIA0OAgFICgsAI/N5EA5MmQt1nLALeRLOZk9BjAHfO37cCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAIlBmbwT4YQKRW+DAAI4uINdJwh+OJu1E0NQB+GKBAQHXAAExAYAg1yHwFMj4QgHMAQGBAQHPAMntVNsx4N7tRNDUAfhigQEB1wABMQHwFYAwACwgbvLQgIAAeyPhCAcwBAYEBAc8Aye1UALvRBrpRDrpMuQYQARYQBYxyUBt5FAP5FnmNWBUILVgSiq2wQQYQBOEFUBCuuMKBnniyAKbyy3gSmg0OEATOQAt4EoIlDVAUcJGJnhAEzqGGgQa6UQ66TJOBBxcXQvgcAgEgDxAAFVlH8BygDgcAHKAIAgEgERIB9zIcQHKAVAH8A1wAcoCUAXPFlAD+gJwAcpoI26zJW6zsY49f/ANyHDwDXDwDSRus5l/8A0E8AFQBMyVNANw8A3iJG6zmX/wDQTwAVAEzJU0A3DwDeJw8A0Cf/ANAslYzJYzMwFw8A3iIW6zmH/wDQHwAQHMlDFw8A3iyQGATACU+EFvJBAjXwN/AnCAQlhtbfAOgAAT7AAIBIBYXAgFIHB0CASAYGQIBIBobAAsyAHPFsmAALR/yAGUcAHLH95vAAFvjG1vjAHwCPAHgABkcAHIzAEBgQEBzwDJgAAUMaSAACTwEfAPgAAk8BDwD4AIBICAhACe4Ni7UTQ1AH4YoEBAdcAATEB8BOAAJtaseAlAATbd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHMA==';

describe('EmulatorBindings', () => {
    it('should create bindings', async () => {
        let code = Cell.fromBoc(Buffer.from(echoCode, 'base64'))[0];
        let data = beginCell()
            .storeRef(Cell.EMPTY)
            .storeInt(0, 257)
            .endCell();
        let bindings = new EmulatorBindings();
        let res = await bindings.runGetMethod({
            verbosity: 0,
            code,
            data,
            address: contractAddress(0, { code, data }),
            config: defaultConfig,
            methodId: 115554, args: [{ type: 'int', value: 1n }],
            balance: 0n,
            gasLimit: 0n,
            unixtime: 0,
            randomSeed: Buffer.alloc(32)
        });
        expect(res.output.success).toBe(true);
        if (res.output.success) {
            expect(res.output.stack).toMatchSnapshot();
        }
    });
    it('should execute emulator case', async () => {

        // verbosity: number,
        // address: Address,
        // code: Cell,
        // data: Cell,
        // balance: bigint,
        // unixtime: number,
        // randomSeed: Buffer,
        // gasLimit: bigint,
        // methodId: number,
        // args: TupleItem[],
        // config: Cell,
        // let ppp = {
        //     code: 'te6cckEBCAEAlwABFP8A9KQT9LzyyAsBAgEgAwIAuPKDCNcYINMf0x/THwL4I7vyY+1E0NMf0x/T/9FRMrryoVFEuvKiBPkBVBBV+RDyo/QE0fgAf44WIYAQ9HhvpSCYAtMH1DAB+wCRMuIBs+ZbAaTIyx/LH8v/ye1UAgFIBwQCAUgGBQARuMl+1E0NcLH4ABe7Oc7UTQ0z8x1wv/gABNAwE3l/rQ==',
        //     data: 'te6cckEBAQEAKgAAUAAAAAEAAAAAjbQby9p37RwFQv8kx3blcbZ6gO1mIWLvoMN5n47Ka2Mw7lLr',
        //     verbosity: 0,
        //     libs: '',
        //     address: '0:26f3f75674dac80f4bb469fb3bbf21860c4c7be7bf7597aa29fca2aae5c5130b',
        //     unixtime: 0,
        //     balance: '9999999999999',
        //     rand_seed: '0000000000000000000000000000000000000000000000000000000000000000',
        //     gas_limit: '1000000000',
        //     method_id: '85143'
        // };
        // let args = [
        //     JSON.stringify(ppp),
        //     'te6cckEBAQEABQAABgAAANAJX0U=',
        //     'te6cckECcQEABW4AAgPNQAgBAgHOBQIBAUgDASsSY2CBqmNgiLIAAQABEAAAAAAAAADABACc0HOOgSeKR9NK7QvAShWEclTKIiT7KeN5YCq4i54HKwIneLCELpUQAAAAAAAAABUmyLDUSVB+cjV8cixVpAvtnckT5vUz9dfl85TM5VefAQFIBgErEmNgeqJjYIGqAAEAARAAAAAAAAAAwAcAnNBzjoEninFgk152x5e4P2obeffAtRXXbENLO/wHPAXk6o16jdMSEAAAAAAAAADXRh/1XRFatoIzSUoCBNvmoi70eMphk2KbS9TlOhR0JwIBIC8JAgEgHQoCASAYCwIBIBMMAQFYDQEBwA4CAWIQDwBBv2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZnAgFiEhEAQb6PZMavv/PdENi6Zwd5CslnDVQPN6lEiwM3uqalqSrKyAAD31ACASAWFAEBIBUAPtcBAwAAA+gAAD6AAAAAAwAAAAgAAAAEACAAAAAgAAABASAXACTCAQAAAPoAAAD6AAAVfAAAAAcCAUgbGQEBIBoAQuoAAAAAAA9CQAAAAAAD6AAAAAAAAYagAAAAAYAAVVVVVQEBIBwAQuoAAAAAAJiWgAAAAAAnEAAAAAAAD0JAAAAAAYAAVVVVVQIBICceAgEgIh8CASAgIAEBICEAUF3DAAIAAAAIAAAAEAAAwwABhqAAB6EgAA9CQMMAAAPoAAATiAAAJxACASAlIwEBICQAlNEAAAAAAAAD6AAAAAAAD0JA3gAAAAAD6AAAAAAAAAAPQkAAAAAAAA9CQAAAAAAAACcQAAAAAACYloAAAAAABfXhAAAAAAA7msoAAQEgJgCU0QAAAAAAAAPoAAAAAACYloDeAAAAACcQAAAAAAAAAA9CQAAAAAAAmJaAAAAAAAAAJxAAAAAAAJiWgAAAAAAF9eEAAAAAADuaygACASAqKAEBSCkATdBmAAAAAAAAAAAAAAAAgAAAAAAAAPoAAAAAAAAB9AAAAAAAA9CQQAIBIC0rAQEgLAAxYJGE5yoAByOG8m/BAABgkYTnKgAAADAACAEBIC4ADAPoAGQAAQIBIGMwAgEgPTECASA3MgIBIDUzAQEgNAAgAAAHCAAABdwAAAJYAAABLAEBIDYAFGtGVT8QBDuaygACASA6OAEBIDkAFRpRdIdugAEBIB9IAQEgOwEBwDwAt9BTMattNoAAkHAAQx3ZAu+VowKbp+ICJmhD5GEorXlHxC3H6wE6MfljTuTBTbWk4gs+NaYDgOTAD+ixkmRV+9aOm8QUXzkDPYIEZQAAAAAP////+AAAAAAAAAAEAgEgTD4CASBDPwEBIEACApFCQQAqNgQHBAIATEtAATEtAAAAAAIAAAPoACo2AgMCAgAPQkAAmJaAAAAAAQAAAfQBASBEAgEgR0UCCbf///BgRl8AAfwCAtlKSAIBYklTAgEgXV0CASBYSwIBzmBgAgEgYU0BASBOAgPNQFBPAAOooAIBIFhRAgEgVVICASBUUwAB1AIBSGBgAgEgV1YCASBbWwIBIFtdAgEgX1kCASBcWgIBIF1bAgEgYGACASBeXQABSAABWAIB1GBgAAEgAQEgYgAaxAAAAAEAAAAAAAAALgIBIGlkAQH0ZQEBwGYCASBoZwAVv////7y9GpSiABAAFb4AAAO8s2cNwVVQAgEgbGoBAUhrAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBIG9tAQEgbgBAMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMBASBwAEBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVaNaat0='
        // ];
        let bindings = new EmulatorBindings();
        let res = await bindings.runGetMethod({
            verbosity: 3,
            address: Address.parseRaw('0:26f3f75674dac80f4bb469fb3bbf21860c4c7be7bf7597aa29fca2aae5c5130b'),
            code: Cell.fromBase64('te6cckECDgEAAjwAART/APSkE/S88sgLAQIBYgYCAgEgBAMATb3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzAElv11faiaGoA/DFAgIDrgACY7Z5AUARjD+AIvEhlbGxvIHdvcmxkIY/hQwgHv+IDB/8AJw8AJt/iAwAgLOCAcALUmYtHRydWWP4UMJqLVmYWxzZY/hQw4oA+tO2i7ftwIddJwh+VMCDXCx/eAtDTAwFxsMABkX+RcOIB+kAiUGZvBPhhApFb4CCCEJRqmLa6jzQw7UTQ1AH4YoEBAdcAATEB0x8BghCUapi2uvLggdM/ATHbPNs8yPhCAcwBAYEBAc8Aye1U4MAAkTDjDfLAgoDQoJANL5AYLwriSRJjCP72Y5wHANIQPkRNizNc3oL9whyHw7e8G531e6jkHtRNDUAfhigQEB1wABMf4Ai8SGVsbG8gd29ybGQhj+FDCAe/4gMH/wAnDwAm3+IDDI+EIBzAEBgQEBzwDJ7VTbMeABJPhBbyQQI18DfwJwgEJYbW3bPAsB9shxAcoBUAcBygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsY5MfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzJczMwFwAcoA4iFuswwAMJx/AcoAASBu8tCAAcyVMXABygDiyQH7AAAcyAGCEK/5D1dYyx/LP8lVcC6X'),
            data: Cell.fromBase64('te6cckECEQEAAmoAAUEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEABAQHAAgEFoMY/AwEU/wD0pBP0vPLICwQCAWIJBQIBIAcGAE293owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwBJb9dX2omhqAPwxQICA64AAmO2eQIAEYw/gCLxIZWxsbyB3b3JsZCGP4UMIB7/iAwf/ACcPACbf4gMAICzgsKAC1JmLR0cnVlj+FDCai1ZmFsc2WP4UMOKAPrTtou37cCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAIlBmbwT4YQKRW+AgghCUapi2uo80MO1E0NQB+GKBAQHXAAExAdMfAYIQlGqYtrry4IHTPwEx2zzbPMj4QgHMAQGBAQHPAMntVODAAJEw4w3ywIKBANDADS+QGC8K4kkSYwj+9mOcBwDSED5ETYszXN6C/cIch8O3vBud9Xuo5B7UTQ1AH4YoEBAdcAATH+AIvEhlbGxvIHdvcmxkIY/hQwgHv+IDB/8AJw8AJt/iAwyPhCAcwBAYEBAc8Aye1U2zHgAST4QW8kECNfA38CcIBCWG1t2zwOAfbIcQHKAVAHAcoAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GOTH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMyXMzMBcAHKAOIhbrMPADCcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAAHMgBghCv+Q9XWMsfyz/JhKJ/gQ=='),
            balance: 9999999999999n,
            unixtime: 0,
            randomSeed: Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex'),
            gasLimit: 1000000000n,
            methodId: 93099,
            args: [],
            config: Cell.fromBase64('te6cckECcQEABW4AAgPNQAgBAgHOBQIBAUgDASsSY2CBqmNgiLIAAQABEAAAAAAAAADABACc0HOOgSeKR9NK7QvAShWEclTKIiT7KeN5YCq4i54HKwIneLCELpUQAAAAAAAAABUmyLDUSVB+cjV8cixVpAvtnckT5vUz9dfl85TM5VefAQFIBgErEmNgeqJjYIGqAAEAARAAAAAAAAAAwAcAnNBzjoEninFgk152x5e4P2obeffAtRXXbENLO/wHPAXk6o16jdMSEAAAAAAAAADXRh/1XRFatoIzSUoCBNvmoi70eMphk2KbS9TlOhR0JwIBIC8JAgEgHQoCASAYCwIBIBMMAQFYDQEBwA4CAWIQDwBBv2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZnAgFiEhEAQb6PZMavv/PdENi6Zwd5CslnDVQPN6lEiwM3uqalqSrKyAAD31ACASAWFAEBIBUAPtcBAwAAA+gAAD6AAAAAAwAAAAgAAAAEACAAAAAgAAABASAXACTCAQAAAPoAAAD6AAAVfAAAAAcCAUgbGQEBIBoAQuoAAAAAAA9CQAAAAAAD6AAAAAAAAYagAAAAAYAAVVVVVQEBIBwAQuoAAAAAAJiWgAAAAAAnEAAAAAAAD0JAAAAAAYAAVVVVVQIBICceAgEgIh8CASAgIAEBICEAUF3DAAIAAAAIAAAAEAAAwwABhqAAB6EgAA9CQMMAAAPoAAATiAAAJxACASAlIwEBICQAlNEAAAAAAAAD6AAAAAAAD0JA3gAAAAAD6AAAAAAAAAAPQkAAAAAAAA9CQAAAAAAAACcQAAAAAACYloAAAAAABfXhAAAAAAA7msoAAQEgJgCU0QAAAAAAAAPoAAAAAACYloDeAAAAACcQAAAAAAAAAA9CQAAAAAAAmJaAAAAAAAAAJxAAAAAAAJiWgAAAAAAF9eEAAAAAADuaygACASAqKAEBSCkATdBmAAAAAAAAAAAAAAAAgAAAAAAAAPoAAAAAAAAB9AAAAAAAA9CQQAIBIC0rAQEgLAAxYJGE5yoAByOG8m/BAABgkYTnKgAAADAACAEBIC4ADAPoAGQAAQIBIGMwAgEgPTECASA3MgIBIDUzAQEgNAAgAAAHCAAABdwAAAJYAAABLAEBIDYAFGtGVT8QBDuaygACASA6OAEBIDkAFRpRdIdugAEBIB9IAQEgOwEBwDwAt9BTMattNoAAkHAAQx3ZAu+VowKbp+ICJmhD5GEorXlHxC3H6wE6MfljTuTBTbWk4gs+NaYDgOTAD+ixkmRV+9aOm8QUXzkDPYIEZQAAAAAP////+AAAAAAAAAAEAgEgTD4CASBDPwEBIEACApFCQQAqNgQHBAIATEtAATEtAAAAAAIAAAPoACo2AgMCAgAPQkAAmJaAAAAAAQAAAfQBASBEAgEgR0UCCbf///BgRl8AAfwCAtlKSAIBYklTAgEgXV0CASBYSwIBzmBgAgEgYU0BASBOAgPNQFBPAAOooAIBIFhRAgEgVVICASBUUwAB1AIBSGBgAgEgV1YCASBbWwIBIFtdAgEgX1kCASBcWgIBIF1bAgEgYGACASBeXQABSAABWAIB1GBgAAEgAQEgYgAaxAAAAAEAAAAAAAAALgIBIGlkAQH0ZQEBwGYCASBoZwAVv////7y9GpSiABAAFb4AAAO8s2cNwVVQAgEgbGoBAUhrAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBIG9tAQEgbgBAMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMBASBwAEBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVaNaat0=')
        });
        console.warn(res.logs);
    })
});