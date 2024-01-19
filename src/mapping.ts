//@ts-ignore
import { BigInt, Bytes, Block, Event, ByteArray } from "@hyperoracle/zkgraph-lib";

export function handleBlocks(blocks: Block[]): Bytes {
    let events: Event[] = blocks[0].events;

    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        if (event.esig == Bytes.fromHexString("0x510d76a89b6e6cdbd77151f89b575da646e907875e3596d3db72d7176c778903")) {
            let playerAddress = event.topic1;
            let points = BigInt.fromBytes(event.data.slice(0, 32));
            let targetAddress = event.data.slice(32, 64); 

            //  calldata for GameB's receivePoints function
            let functionSignature = Bytes.fromHexString("34fda218");
            let calldata = ByteArray.empty()
                                .concat(functionSignature)
                                .concat(playerAddress)
                                .concat(convertBigIntToByteArray(points)) 
                                .concat(targetAddress);

            return Bytes.fromByteArray(calldata); 
        }
    }

    return Bytes.empty();
}

function convertBigIntToByteArray(value: BigInt): ByteArray {
    return ByteArray.fromHexString(value.toHexString().padStart(64, '0'));
}
