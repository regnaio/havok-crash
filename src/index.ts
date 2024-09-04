const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
const light = new BABYLON.HemisphericLight('', new BABYLON.Vector3(0, 100, 0), scene);
const camera = new BABYLON.ArcRotateCamera('', 0, (Math.PI * 3) / 8, 50, new BABYLON.Vector3(), scene);

engine.runRenderLoop(() => {
	scene.render();
});

window.addEventListener('resize', () => {
	engine.resize();
});

(async (wasmPath?: string): Promise<void> => {
	try {
		// @ts-expect-error
		globalThis.HK = await HavokPhysics(
			wasmPath === undefined //
				? undefined
				: { locateFile: (): string => wasmPath },
		);
	} catch (err) {
		console.error('catch: err:', err);
	}

	scene.enablePhysics(undefined, new BABYLON.HavokPlugin());

	const groundMesh = BABYLON.CreateGroundFromHeightMap('', '/static/heightmap.jpeg', {
		width: 100,
		height: 100,
		subdivisions: 100,

		maxHeight: 10,

		onReady(mesh, heightBuffer) {
			// console.debug('heightBuffer:', heightBuffer);

			// @ts-expect-error
			mesh.heightBuffer = heightBuffer;

			const groundAgg = new BABYLON.PhysicsAggregate(
				mesh,
				BABYLON.PhysicsShapeType.HEIGHTFIELD,
				{
					mass: 0,

					restitution: 0.5,

					// @ts-expect-error
					groundMesh: mesh,
				},
				scene,
			);

			const boxMesh = BABYLON.MeshBuilder.CreateBox('', { width: 1, height: 2, depth: 4 });
			boxMesh.position.set(0, 20, 0);
			const boxAgg = new BABYLON.PhysicsAggregate(boxMesh, BABYLON.PhysicsShapeType.BOX, { mass: 1, restitution: 0.5 });
		},

		passHeightBufferInCallback: true,
	});
})();
