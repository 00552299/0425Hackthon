import { createClickModule } from './modules.click.js';
import { createSimilarityModule } from './modules.similarity.js';
import { createRotateModule } from './modules.rotate.js';
import { createScenariosModule } from './modules.scenarios.js';

function makeModuleFactory(type) {
    const table = {
        click: createClickModule,
        similarity: createSimilarityModule,
        rotate: createRotateModule,
        scenarios: createScenariosModule,
    };
    return table[type] || null;
}

export function createModuleRuntime({ scene, interaction, hud, session }) {
    let activeIndex = -1;
    let activeModule = null;
    let idleSeconds = 0;

    function mountByIndex(nextIndex) {
        const modules = session.modules || [];
        if (!modules.length) {
            return;
        }

        if (activeModule && activeModule.dispose) {
            activeModule.dispose();
        }
        interaction.clearClickableTargets();

        activeIndex = ((nextIndex % modules.length) + modules.length) % modules.length;
        const moduleData = modules[activeIndex];
        const factory = makeModuleFactory(moduleData.type);

        if (!factory) {
            hud.setCard({
                titleText: 'Unsupported module type',
                subtitleText: moduleData.type,
                tipsText: 'No renderer is registered for this module.',
            });
            activeModule = null;
            return;
        }

        activeModule = factory({ scene, interaction, hud, moduleData });
        idleSeconds = 0;
    }

    function nextModule() {
        mountByIndex(activeIndex + 1);
    }

    function start() {
        mountByIndex(0);
    }

    function update(delta) {
        if (!activeModule) {
            return;
        }

        activeModule.update?.(delta);
        if (interaction.consumeActivityPulse()) {
            idleSeconds = 0;
        } else {
            idleSeconds += delta;
        }

        const limit = activeModule.autoAdvanceSeconds || 12;
        if (idleSeconds >= limit) {
            nextModule();
        }
    }

    function dispose() {
        if (activeModule && activeModule.dispose) {
            activeModule.dispose();
        }
    }

    return {
        start,
        update,
        nextModule,
        dispose,
    };
}
