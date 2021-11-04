<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
  version="2.0">
<xsl:output method="text" indent="no" encoding="UTF-8" />
    <xsl:template match="/PAP">
import Big, { RoundingMode } from 'big.js';
import { TaxJs, TaxJsValueType, TaxJsDictionary } from '../../declaration/TaxJs';

type <xsl:value-of select="./@name" />InBigType = <xsl:for-each select="./VARIABLES/INPUTS/INPUT[@type = 'BigDecimal']">"<xsl:value-of select="./@name" />"<xsl:if test="position() != last()">|</xsl:if></xsl:for-each>;
type <xsl:value-of select="./@name" />InNumberType = <xsl:for-each select="./VARIABLES/INPUTS/INPUT[@type != 'BigDecimal']">"<xsl:value-of select="./@name" />"<xsl:if test="position() != last()">|</xsl:if></xsl:for-each>;
type <xsl:value-of select="./@name" />OutType = <xsl:for-each select="./VARIABLES/OUTPUTS/OUTPUT">"<xsl:value-of select="./@name" />"<xsl:if test="position() != last()">|</xsl:if></xsl:for-each>;

/**
* Steuerberechnungsklasse.
* 
* Generiert aus Pseudocode von: &lt;a href="https://www.bmf-steuerrechner.de"&gt;bmf-steuerrechner&lt;/a&gt;
* 
*/
export class <xsl:value-of select="./@name" /> implements TaxJs&lt;<xsl:value-of select="./@name" />InBigType, <xsl:value-of select="./@name" />InNumberType, <xsl:value-of select="./@name" />OutType> {
    private static readonly _n = "number";
	private static readonly _b = "Big";
	private static readonly _i = "input";
	private static readonly _o = "output";
	private static readonly _s = "STANDARD";
	private static readonly _d = "DBA";
	private readonly Z_0 : Big = new Big(0);
    private readonly Z_1 : Big = new Big(1);
	private readonly Z_10 : Big = new Big(10);
    <xsl:apply-templates select="./VARIABLES" />
    <xsl:apply-templates select="./CONSTANTS" />
	<xsl:apply-templates select="./METHODS" />
	<xsl:call-template name="inputGetterAndSetter"/>
	<xsl:call-template name="outputGetter"/>
	<xsl:call-template name="initMethod"/>
	<xsl:call-template name="generalSetter"/>
	<xsl:call-template name="generalGetter"/>

	/**
	 * Converts a value (number or Big) in the correct type (number or Big).
	 * 
	 * @param {string} name the name of the value
	 * @param {TaxJsValueType} value the value to convert
	 */
	public toType(name: string, value: TaxJsValueType): TaxJsValueType {
		const info = <xsl:value-of select="/PAP/@name" />.typeDirectory[name];
		if (!info) {
			throw new Error("Unknown parameter " + name);
		}
		if (typeof value == "number" &amp;&amp; info.type != "number") {
			return new Big(value as number);
		}
		if (typeof value == "object" &amp;&amp; info.type == "number") {
			return (value as Big).toNumber();
		}
		return value;
	}
}
    </xsl:template>

    <xsl:template match="INPUT"><xsl:call-template name="variables" /></xsl:template>
	<xsl:template match="OUTPUT"><xsl:call-template name="variables" /></xsl:template>
	<xsl:template match="INTERNAL"><xsl:call-template name="variables" /></xsl:template>
    <xsl:template match="CONSTANT"><xsl:call-template name="constant" /></xsl:template>
	<xsl:template match="MAIN">public calculate() : void {<xsl:apply-templates select="child::node()" />}</xsl:template>
	<xsl:template match="METHOD">private <xsl:value-of select="./@name" />() : void {<xsl:apply-templates select="child::node()" />}</xsl:template>
    <xsl:template match="EXECUTE">this.<xsl:value-of select="./@method" />();</xsl:template>
	<xsl:template match="EVAL"><xsl:call-template name="convertExpression"><xsl:with-param name="value" select="./@exec"/></xsl:call-template>;</xsl:template>
	<xsl:template match="IF">if (<xsl:call-template name="convertExpression"><xsl:with-param name="value" select="./@expr"/></xsl:call-template>) {<xsl:apply-templates select="child::node()" />}</xsl:template>
	<xsl:template match="THEN"><xsl:apply-templates select="child::node()" /></xsl:template>
	<!-- Standard case: <IF><THEN>...</THEN><ELSE>...</ELSE></IF> -->
	<xsl:template match="ELSE[parent::IF]">}else {<xsl:apply-templates select="child::node()" /></xsl:template>
	<!-- Bug case: <IF><THEN>...</THEN></IF><ELSE>...</ELSE> -->
	<xsl:template match="ELSE[not(parent::IF)]">else {<xsl:apply-templates select="child::node()" />}</xsl:template>
	<xsl:template match="comment()">/** <xsl:value-of select="."/> */</xsl:template>

    <!-- Templates by name for 'xsl:call-template' -->
	
	<!-- common template for variables -->
	<xsl:template name="variables">private <xsl:value-of select="./@name" /><xsl:value-of select="' : '" /><xsl:call-template name="convertTypes"><xsl:with-param name="value" select="./@type"/></xsl:call-template><xsl:if test="@default and string-length(@default)>0"> = <xsl:call-template name="convertValue"><xsl:with-param name="value" select="./@default"/></xsl:call-template></xsl:if>;</xsl:template>
	
    <!-- common template for constants -->
	<xsl:template name="constant">private readonly <xsl:value-of select="./@name" /><xsl:value-of select="' : '" /><xsl:call-template name="convertTypes"><xsl:with-param name="value" select="./@type"/></xsl:call-template> = <xsl:call-template name="convertValue"><xsl:with-param name="value" select="./@value"/></xsl:call-template>;</xsl:template>
	
	<!-- Getter and Setter for Input variables -->
	<xsl:template name="inputGetterAndSetter">
		<xsl:for-each select="./VARIABLES/INPUTS/INPUT"><xsl:call-template name="getter" /><xsl:call-template name="setter" /></xsl:for-each>
	</xsl:template>
	
	<!-- Getter for Output variables -->
	<xsl:template name="outputGetter">
		<xsl:for-each select="./VARIABLES/OUTPUTS/OUTPUT"><xsl:call-template name="getter" /></xsl:for-each>
	</xsl:template>
	
	<!-- a getter method-->
	<xsl:template name="getter">
	/**
	 * Getter for <xsl:value-of select="./@name" />.
	 * <xsl:text>&lt;p&gt;</xsl:text>
	 * <xsl:value-of select="preceding-sibling::comment()[1]"/>
	 * <xsl:text>&lt;p&gt;</xsl:text>
	 * @return the value
	 */
	public get<xsl:value-of select="upper-case(substring(./@name, 1, 1))" /><xsl:value-of select="substring(./@name, 2)" />() : <xsl:call-template name="convertTypes"><xsl:with-param name="value" select="./@type"/></xsl:call-template> {
		return this.<xsl:value-of select="./@name" />;
    }
    </xsl:template>

	<!-- a setter method -->
    <xsl:template name="setter">
    /**
     * Setter for <xsl:value-of select="./@name" />.
     * <xsl:text>&lt;p&gt;</xsl:text>
     * <xsl:value-of select="preceding-sibling::comment()[1]"/>
     * <xsl:text>&lt;p&gt;</xsl:text>
     * @param {<xsl:call-template name="convertTypes"><xsl:with-param name="value" select="./@type"/></xsl:call-template>} <xsl:value-of select="./@name" /> input value 
     */
	public set<xsl:value-of select="upper-case(substring(./@name, 1, 1))" /><xsl:value-of select="substring(./@name, 2)" />(<xsl:value-of select="' '" /><xsl:value-of select="./@name" /> : <xsl:call-template name="convertTypes"><xsl:with-param name="value" select="./@type"/></xsl:call-template>) : void {
		this.<xsl:value-of select="./@name" /> = <xsl:value-of select="./@name" />;
    }
    </xsl:template>

	<!-- initialize input values (set all to zero) -->
	<xsl:template name="initMethod">
	/**
	 * Initialize all inputs values with zero.
	 */
	public initInputs() : void {
		<xsl:for-each select="./VARIABLES/INPUTS/INPUT">
			<xsl:if test="./@type = 'BigDecimal'">this.<xsl:value-of select="./@name" /> = </xsl:if>
		</xsl:for-each>this.Z_0;
		<xsl:for-each select="./VARIABLES/INPUTS/INPUT">
			<xsl:if test="./@type != 'BigDecimal'">this.<xsl:value-of select="./@name" /> = </xsl:if>
		</xsl:for-each>0;
	}
	</xsl:template>

	<!-- Setter for all input parameters. -->
	<xsl:template name="generalSetter">
	/**
	 * Setter for Big input parameters.
	 *
	 * @param {string} name Variable name to set.
	 * @param {Big} value Value to set.
	 */
	public setBig(name: <xsl:value-of select="/PAP/@name" />InBigType, value : Big): void {
		if (this.hasOwnProperty(name)) {
			this[name] = value;
		}else {
			throw new Error("Unknown parameter " + name);
		}
	}

	/**
	 * Setter for number input parameters.
	 *
	 * @param {string} name Variable name to set.
	 * @param {number} value Value to set.
	 */
	public setNumber(name: <xsl:value-of select="/PAP/@name" />InNumberType, value : number): void {
		if (this.hasOwnProperty(name)) {
			this[name] = value;
		}else {
			throw new Error("Unknown parameter " + name);
		}
	}
	</xsl:template>

	<!-- Getter for all output parameters. -->
	<xsl:template name="generalGetter">
	/**
	 * Getter for all output parameters. You get a value of type "number or "Big".
	 *
	 * @param {string} name Variable name to get.
	 */
	public get(name: <xsl:value-of select="/PAP/@name" />InBigType | <xsl:value-of select="/PAP/@name" />InNumberType | <xsl:value-of select="/PAP/@name" />OutType) : TaxJsValueType {
		if (this.hasOwnProperty(name)) {
			return this[name];
		}
		throw new Error("Unknown parameter " + name);
	}

	private static readonly typeDirectory: TaxJsDictionary = {
		<xsl:for-each select="./VARIABLES/INPUTS/INPUT">"<xsl:value-of select="./@name" />": {type:<xsl:value-of select="/PAP/@name" />.<xsl:if test="./@type = 'BigDecimal'">_b</xsl:if><xsl:if test="./@type != 'BigDecimal'">_n</xsl:if>, direction: <xsl:value-of select="/PAP/@name" />._i},</xsl:for-each>
		<xsl:for-each select="./VARIABLES/OUTPUTS[@type!='DBA']/OUTPUT">"<xsl:value-of select="./@name" />": {type:<xsl:value-of select="/PAP/@name" />.<xsl:if test="./@type = 'BigDecimal'">_b</xsl:if><xsl:if test="./@type != 'BigDecimal'">_n</xsl:if>, direction: <xsl:value-of select="/PAP/@name" />._o, group:<xsl:value-of select="/PAP/@name" />._s},</xsl:for-each>
		<xsl:for-each select="./VARIABLES/OUTPUTS[@type='DBA']/OUTPUT">"<xsl:value-of select="./@name" />": {type:<xsl:value-of select="/PAP/@name" />.<xsl:if test="./@type = 'BigDecimal'">_b</xsl:if><xsl:if test="./@type != 'BigDecimal'">_n</xsl:if>, direction: <xsl:value-of select="/PAP/@name" />._o, group:<xsl:value-of select="/PAP/@name" />._d},</xsl:for-each>
	};

	/**
	 * Get all fields with types.
	 */
	public getDirectory() : TaxJsDictionary {
		return <xsl:value-of select="/PAP/@name" />.typeDirectory;
	}
	</xsl:template>

	<!-- Templates for content transformation. -->

	<!-- Transform expressions. -->
	<xsl:template name="convertExpression">
		<xsl:param name = "value" />
		<xsl:value-of select="replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace($value, '^(.*)divide\s*\(((?:[^,\)]|\([^\(\)]+\))+),((?:[^,\)]|\([^\(\)]+\))+),\s*(BigDecimal\.ROUND_[A-Z_]+)\s*\)(.*)$', '$1div($2).round($3, $4)$5'), 'BigDecimal.ROUND_UP', 'RoundingMode.RoundUp'), 'BigDecimal.ROUND_DOWN', 'RoundingMode.RoundDown'), 'BigDecimal.valueOf', 'new Big'), 'BigDecimal.ONE', 'ZAHL1'), 'BigDecimal.ZERO', 'Z_0'), 'BigDecimal', 'Big'), 'longValue', 'toNumber'), 'int|double|long', 'number'), 'divide', 'div'), 'multiply', 'mul'), 'subtract', 'sub'), 'compareTo', 'cmp'), 'setScale', 'round'), '([0-9])(?:L|D)([^A_Za-z])', '$1$2'), '([A-Z_][A-Z0-9_]*(?:[^a-z]|$))', 'this.$1'), '([^a-zA-Z0-9]|^)(f|af|bd)([^a-zA-Z0-9]|$)', '$1this.$2$3')" />
	</xsl:template>

	<!-- Transform values. -->
	<xsl:template name="convertValue">
		<xsl:param name = "value" />
		<xsl:value-of select="replace(replace(replace(replace(replace(replace(replace($value, '\}', ']'), '\{', '['), 'new BigDecimal\(0\)|BigDecimal\.ZERO', 'this.Z_0'), 'BigDecimal\.valueOf|new BigDecimal', 'new Big'), 'BigDecimal.ONE', 'this.Z_1'), 'BigDecimal.TEN', 'this.Z_10'), 'setScale', 'round')" />
	</xsl:template>

	<!-- Transform types. -->
	<xsl:template name="convertTypes">
		<xsl:param name = "value" />
		<xsl:value-of select="replace(replace($value, 'int|double|long', 'number'), 'BigDecimal', 'Big')" />
	</xsl:template>
</xsl:stylesheet>