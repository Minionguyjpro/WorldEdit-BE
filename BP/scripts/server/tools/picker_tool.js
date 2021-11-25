import { World, MinecraftBlockTypes } from 'mojang-minecraft';
import { Tool } from './base_tool.js';
import { Tools } from './tool_manager.js';
import { RawText } from '../modules/rawtext.js';
import { PlayerUtil } from '../modules/player_util.js';
class PatternPickerTool extends Tool {
    constructor() {
        super(...arguments);
        this.tag = 'wedit:picking_pattern';
        this.itemTool = 'wedit:pattern_picker';
        this.useOn = (player, session, loc) => {
            const dimension = PlayerUtil.getDimension(player)[1];
            let addedToPattern = false;
            let block = World.getDimension(dimension).getBlock(loc).permutation.clone();
            let blockName = block.type.id;
            if (player.isSneaking) {
                session.globalPattern.addBlock(block);
                addedToPattern = true;
            }
            else {
                session.globalPattern.clear();
                session.globalPattern.addBlock(block);
            }
            const properties = block.getAllProperties();
            if (properties.length && blockName != 'water' && blockName != 'lava') {
                for (let i = 0; i < properties.length; i++) {
                    const prop = properties[i];
                    const val = typeof prop.value == 'string' ? `'${prop.value}'` : prop.value;
                    blockName += `\n§o${prop.name}§r: ${val}`;
                }
            }
            if (blockName.startsWith('minecraft:')) {
                blockName = blockName.slice('minecraft:'.length);
            }
            this.log(RawText.translate('worldedit.pattern-picker.' + (addedToPattern ? 'add' : 'set'))
                .append('text', blockName));
        };
        this.use = (player, session) => {
            const dimension = PlayerUtil.getDimension(player)[1];
            let addedToPattern = true;
            if (!player.isSneaking) {
                session.globalPattern.clear();
                addedToPattern = false;
            }
            session.globalPattern.addBlock(MinecraftBlockTypes.air.createDefaultBlockPermutation());
            this.log(RawText.translate('worldedit.pattern-picker.' + (addedToPattern ? 'add' : 'set'))
                .append('text', 'air'));
        };
    }
}
Tools.register(PatternPickerTool, 'pattern_picker');
class MaskPickerTool extends Tool {
    constructor() {
        super(...arguments);
        this.tag = 'wedit:picking_mask';
        this.itemTool = 'wedit:mask_picker';
        this.useOn = (player, session, loc) => {
            const dimension = PlayerUtil.getDimension(player)[1];
            let addedToPattern = false;
            let block = World.getDimension(dimension).getBlock(loc).permutation.clone();
            let blockName = block.type.id;
            if (player.isSneaking) {
                session.globalMask.addBlock(block);
                addedToPattern = true;
            }
            else {
                session.globalMask.clear();
                session.globalMask.addBlock(block);
            }
            // TODO: Properly name fences, shulker boxes, polished stones, slabs, glazed terracotta, sand
            const properties = block.getAllProperties();
            if (properties.length && blockName != 'water' && blockName != 'lava') {
                for (let i = 0; i < properties.length; i++) {
                    const prop = properties[i];
                    const val = typeof prop.value == 'string' ? `'${prop.value}'` : prop.value;
                    blockName += `\n§o${prop.name}§r: ${val}`;
                }
            }
            if (blockName.startsWith('minecraft:')) {
                blockName = blockName.slice('minecraft:'.length);
            }
            this.log(RawText.translate('worldedit.mask-picker.' + (addedToPattern ? 'add' : 'set'))
                .append('text', blockName));
        };
        this.use = (player, session) => {
            const dimension = PlayerUtil.getDimension(player)[1];
            let addedToPattern = true;
            if (!player.isSneaking) {
                session.globalMask.clear();
                addedToPattern = false;
            }
            session.globalMask.addBlock(MinecraftBlockTypes.air.createDefaultBlockPermutation());
            this.log(RawText.translate('worldedit.mask-picker.' + (addedToPattern ? 'add' : 'set'))
                .append('text', 'air'));
        };
    }
}
Tools.register(MaskPickerTool, 'mask_picker');
