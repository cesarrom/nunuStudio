import {Locale} from "../../../locale/LocaleManager.js";
import {Global} from "../../../Global.js";
import {Editor} from "../../../Editor.js";
import {TabComponent} from "../../../components/tabs/TabComponent.js";
import {Canvas} from "../../../components/Canvas.js";
import * as Escher from "escher.js/build/escher.module.js";

/**
 * Profiling tab is used to measure the performance of the application booth in the editor and while it is running.
 *
 * Can measure FPS, CPU usage, memory etc, some metrics may only be available when the editor is running in desktop.
 *
 * @constructor
 * @class ProfilingTab
 * @extends {TabComponent}
 * @param parent
 * @param closeable
 * @param container
 * @param index
 */
function ProfilingTab(parent, closeable, container, index)
{
	TabComponent.call(this, parent, closeable, container, index, Locale.profiling, Global.FILE_PATH + "icons/misc/speedometer.png");

	// Canvas
	this.canvas = new Canvas(this);

	this.group = new Escher.Object2D();

	this.viewport = new Escher.Viewport(this.canvas.element);

	this.renderer = new Escher.Renderer(this.canvas.element);

	this.controls = new Escher.ViewportControls(this.viewport);

	var box = new Escher.Box();
	box.position.set(-100, 0);
	this.group.add(box);

	var circle = new Escher.Circle();
	circle.position.set(100, 0);
	circle.radius = 50;
	this.group.add(circle);
}

ProfilingTab.prototype = Object.create(TabComponent.prototype);

ProfilingTab.prototype.update = function()
{
	// Renderer info
	var tabs = Editor.gui.tab.getActiveTab();
	for(var i = 0; i < tabs.length; i++)
	{
		var tab = tabs[i];
		var renderer = tab.renderer || (tab.canvas ? tab.canvas.renderer : undefined);
		if(renderer !== undefined)
		{
			// TODO <CHANGE THIS>
			//console.log(renderer.info);
		}
	}

	this.controls.update(this.renderer.pointer);
	this.renderer.update(this.group, this.viewport);

	// System metrics
	// TODO <ADD CODE HERE>
};

ProfilingTab.prototype.updateSize = function()
{
	TabComponent.prototype.updateSize.call(this);

	this.canvas.size.copy(this.size);
	this.canvas.position.set(0, 0);
	this.canvas.updateInterface();
};

export {ProfilingTab};