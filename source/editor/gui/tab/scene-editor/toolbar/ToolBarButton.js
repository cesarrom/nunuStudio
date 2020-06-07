"use strict";

/**
 * Editor tool bar button.
 * 
 * @class ToolBarButton
 * @extends {ButtonIcon}
 * @param {Component} parent Parent element.
 */
function ToolBarButton(parent)
{
	ButtonIcon.call(this, parent);

	var self = this;

	this.element.style.overflow = "visible";

	this.icon.setStyle("left", "25%");
	this.icon.setStyle("top", "25%");
	this.icon.setStyle("width","50%");
	this.icon.setStyle("height", "50%");

	/** 
	 * Component to display the text on mouse over.
	 *
	 * @attribute text
	 * @type {Text}
	 */
	this.text = new Text(this);
	this.text.setMode(Component.BOTTOM_LEFT);
	this.text.setStyle("backgroundColor", Palette.getColor("dark"));
	this.text.setStyle("borderRadius", "5px");
	this.text.setStyle("opacity", "0.8");
	this.text.setTextColor(Palette.getColor("white"));
	this.text.setVisibility(false);
	
	this.element.onmouseenter = function()
	{	
		self.text.setVisibility(true);
		this.style.backgroundColor = Palette.getColor("black");
	};
	this.element.onmouseleave = function()
	{
		self.text.setVisibility(false);
		this.style.backgroundColor = null;
	};
}

ToolBarButton.prototype = Object.create(ButtonIcon.prototype);

/**
 * Set button text, the text is displayed when mouse passes over the button.
 *
 * @method setText
 * @param {String} text Text to display on mouse over.
 */
ToolBarButton.prototype.setText = function(text)
{
	this.text.setText(text);
};

ToolBarButton.prototype.updateSize = function()
{
	ButtonIcon.prototype.updateSize.call(this);

	this.text.size.set(this.text.measure().x + 20, 30);
	this.text.updateSize();
	this.text.position.set((this.size.x - this.text.size.x) / 2, this.size.y + 2);
	this.text.updatePosition();
};
