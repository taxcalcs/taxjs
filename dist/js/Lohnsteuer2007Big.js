/**
* Steuerberechnungsklasse.
*
* Generiert aus Pseudocode von: <a href="https://www.bmf-steuerrechner.de">bmf-steuerrechner</a>
*
*/
var Lohnsteuer2007Big = /** @class */ (function () {
    function Lohnsteuer2007Big() {
        this.Z_0 = new Big(0);
        this.Z_1 = new Big(1);
        this.Z_10 = new Big(10);
        /**   AUSGABEPARAMETER   */
        /**  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents  */
        this.BK = this.Z_0;
        /**  Bemessungsgrundlage der sonstigen Einkuenfte (ohne Verguetung
             fuer mehrjaehrige Taetigkeit) fuer die Kirchenlohnsteuer in Cents  */
        this.BKS = this.Z_0;
        this.BKV = this.Z_0;
        /**  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents  */
        this.LSTLZZ = this.Z_0;
        /**  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
             in Cents  */
        this.SOLZLZZ = this.Z_0;
        /**  Solidaritaetszuschlag fuer sonstige Bezuege (ohne Verguetung fuer mehrjaehrige
             Taetigkeit) in Cents  */
        this.SOLZS = this.Z_0;
        /**  Solidaritaetszuschlag fuer die Verguetung fuer mehrjaehrige Taetigkeit in
             Cents  */
        this.SOLZV = this.Z_0;
        /**  Lohnsteuer fuer sonstige Einkuenfte (ohne Verguetung fuer mehrjaehrige
             Taetigkeit) in Cents  */
        this.STS = this.Z_0;
        /**  Lohnsteuer fuer Verguetung fuer mehrjaehrige Taetigkeit in Cents  */
        this.STV = this.Z_0;
        /**   INTERNE FELDER   */
        /**  Altersentlastungsbetrag nach Alterseinkuenftegesetz in Cents  */
        this.ALTE = this.Z_0;
        /**  Arbeitnehmer-Pauschbetrag in EURO  */
        this.ANP = this.Z_0;
        /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
             auf ganze Cents abgerundet  */
        this.ANTEIL1 = this.Z_0;
        /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
             auf ganze Cents aufgerundet  */
        this.ANTEIL2 = this.Z_0;
        /**  Bemessungsgrundlage fuer Altersentlastungsbetrag in Cents  */
        this.BMG = this.Z_0;
        /**  Differenz zwischen ST1 und ST2 in EURO  */
        this.DIFF = this.Z_0;
        /**  Entlastungsbetrag fuer Alleinerziehende in EURO  */
        this.EFA = this.Z_0;
        /**  Versorgungsfreibetrag in Cents  */
        this.FVB = this.Z_0;
        /**  Zuschlag zum Versorgungsfreibetrag in EURO  */
        this.FVBZ = this.Z_0;
        /**  Massgeblich maximaler Versorgungsfreibetrag in Cents  */
        this.HFVB = this.Z_0;
        /**  Nummer der Tabellenwerte fuer Versorgungsparameter  */
        this.J = 0;
        /**  Jahressteuer nach § 51a EStG, aus der Solidaritaetszuschlag und
             Bemessungsgrundlage fuer die Kirchenlohnsteuer ermittelt werden in EURO  */
        this.JBMG = this.Z_0;
        /**  Jahreswert, dessen Anteil fuer einen Lohnzahlungszeitraum in
             UPANTEIL errechnet werden soll in Cents  */
        this.JW = this.Z_0;
        /**  Nummer der Tabellenwerte fuer Parameter bei Altersentlastungsbetrag  */
        this.K = 0;
        /**  Kennzeichen bei Verguetung fuer mehrjaehrige Taetigkeit
             0 = beim Vorwegabzug ist ZRE4VP zu beruecksichtigen
             1 = beim Vorwegabzug ist ZRE4VP1 zu beruecksichtigen  */
        this.KENNZ = 0;
        /**  Summe der Freibetraege fuer Kinder in EURO  */
        this.KFB = this.Z_0;
        /**  Kennzahl fuer die Einkommensteuer-Tabellenart:
             1 = Grundtabelle
             2 = Splittingtabelle  */
        this.KZTAB = 0;
        /**  Jahreslohnsteuer in EURO  */
        this.LSTJAHR = this.Z_0;
        /**  Zwischenfelder der Jahreslohnsteuer in Cents  */
        this.LST1 = this.Z_0;
        this.LST2 = this.Z_0;
        this.LST3 = this.Z_0;
        /**  Mindeststeuer fuer die Steuerklassen V und VI in EURO  */
        this.MIST = this.Z_0;
        /**  Arbeitslohn des Lohnzahlungszeitraums nach Abzug der Freibetraege
             fuer Versorgungsbezuege, des Altersentlastungsbetrags und des
             in der Lohnsteuerkarte eingetragenen Freibetrags und Hinzurechnung
             eines Hinzurechnungsbetrags in Cents. Entspricht dem Arbeitslohn,
             fuer den die Lohnsteuer im personellen Verfahren aus der
             zum Lohnzahlungszeitraum gehoerenden Tabelle abgelesen wuerde  */
        this.RE4LZZ = this.Z_0;
        /**  Arbeitslohn des Lohnzahlungszeitraums nach Abzug der Freibetraege
             fuer Versorgungsbezuege und des Altersentlastungsbetrags in
             Cents zur Berechnung der Vorsorgepauschale  */
        this.RE4LZZV = this.Z_0;
        /**  Rechenwert in Gleitkommadarstellung  */
        this.RW = this.Z_0;
        /**  Sonderausgaben-Pauschbetrag in EURO  */
        this.SAP = this.Z_0;
        /**  Freigrenze fuer den Solidaritaetszuschlag in EURO  */
        this.SOLZFREI = this.Z_0;
        /**  Solidaritaetszuschlag auf die Jahreslohnsteuer in EURO, C (2 Dezimalstellen)  */
        this.SOLZJ = this.Z_0;
        /**  Zwischenwert fuer den Solidaritaetszuschlag auf die Jahreslohnsteuer
             in EURO, C (2 Dezimalstellen)  */
        this.SOLZMIN = this.Z_0;
        /**  Tarifliche Einkommensteuer in EURO  */
        this.ST = this.Z_0;
        /**  Tarifliche Einkommensteuer auf das 1,25-fache ZX in EURO  */
        this.ST1 = this.Z_0;
        /**  Tarifliche Einkommensteuer auf das 0,75-fache ZX in EURO  */
        this.ST2 = this.Z_0;
        /**  Bemessungsgrundlage fuer den Versorgungsfreibetrag in Cents  */
        this.VBEZB = this.Z_0;
        /**  Hoechstbetrag der Vorsorgepauschale nach Alterseinkuenftegesetz in EURO, C  */
        this.VHB = this.Z_0;
        /**  Vorsorgepauschale in EURO, C (2 Dezimalstellen)  */
        this.VSP = this.Z_0;
        /**  Vorsorgepauschale nach Alterseinkuenftegesetz in EURO, C  */
        this.VSPN = this.Z_0;
        /**  Zwischenwert 1 bei der Berechnung der Vorsorgepauschale nach
             dem Alterseinkuenftegesetz in EURO, C (2 Dezimalstellen)  */
        this.VSP1 = this.Z_0;
        /**  Zwischenwert 2 bei der Berechnung der Vorsorgepauschale nach
             dem Alterseinkuenftegesetz in EURO, C (2 Dezimalstellen)  */
        this.VSP2 = this.Z_0;
        /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 3 EStG in EURO  */
        this.VSPKURZ = this.Z_0;
        /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 2 EStG in EURO  */
        this.VSPMAX1 = this.Z_0;
        /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 3 EStG in EURO  */
        this.VSPMAX2 = this.Z_0;
        /**  Vorsorgepauschale nach § 10c Abs. 2 Satz 2 EStG vor der Hoechstbetragsberechnung
             in EURO, C (2 Dezimalstellen)  */
        this.VSPO = this.Z_0;
        /**  Fuer den Abzug nach § 10c Abs. 2 Nrn. 2 und 3 EStG verbleibender
             Rest von VSPO in EURO, C (2 Dezimalstellen)  */
        this.VSPREST = this.Z_0;
        /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 1 EStG
             in EURO, C (2 Dezimalstellen)  */
        this.VSPVOR = this.Z_0;
        /**  Zu versteuerndes Einkommen gem. § 32a Abs. 1 und 2 EStG
             (2 Dezimalstellen)  */
        this.X = this.Z_0;
        /**  gem. § 32a Abs. 1 EStG (6 Dezimalstellen)  */
        this.Y = this.Z_0;
        /**  Auf einen Jahreslohn hochgerechnetes RE4LZZ in EURO, C (2 Dezimalstellen)  */
        this.ZRE4 = this.Z_0;
        /**  Auf einen Jahreslohn hochgerechnetes RE4LZZV zur Berechnung
             der Vorsorgepauschale in EURO, C (2 Dezimalstellen)  */
        this.ZRE4VP = this.Z_0;
        /**  Sicherungsfeld von ZRE4VP in EURO,C bei der Berechnung des Vorwegabzugs
             fuer die Verguetung fuer mehrjaehrige Taetigkeit  */
        this.ZRE4VP1 = this.Z_0;
        /**  Feste Tabellenfreibetraege (ohne Vorsorgepauschale) in EURO  */
        this.ZTABFB = this.Z_0;
        /**  Auf einen Jahreslohn hochgerechnetes (VBEZ abzueglich FVB) in
             EURO, C (2 Dezimalstellen)  */
        this.ZVBEZ = this.Z_0;
        /**  Zu versteuerndes Einkommen in EURO  */
        this.ZVE = this.Z_0;
        /**  Zwischenfelder zu X fuer die Berechnung der Steuer nach § 39b
             Abs. 2 Satz 8 EStG in EURO. */
        this.ZX = this.Z_0;
        this.ZZX = this.Z_0;
        this.HOCH = this.Z_0;
        this.VERGL = this.Z_0;
        /**  Tabelle fuer die Vomhundertsaetze des Versorgungsfreibetrags  */
        this.TAB1 = [new Big(0.0), new Big(0.4), new Big(0.384), new Big(0.368), new Big(0.352), new Big(0.336), new Big(0.32), new Big(0.304), new Big(0.288), new Big(0.272), new Big(0.256), new Big(0.24), new Big(0.224), new Big(0.208), new Big(0.192), new Big(0.176), new Big(0.16), new Big(0.152), new Big(0.144), new Big(0.136), new Big(0.128), new Big(0.12), new Big(0.112), new Big(0.104), new Big(0.096), new Big(0.088), new Big(0.08), new Big(0.072), new Big(0.064), new Big(0.056), new Big(0.048), new Big(0.04), new Big(0.032), new Big(0.024), new Big(0.016), new Big(0.008), new Big(0.0)];
        /**  Tabelle fuer die Hoechstbetrage des Versorgungsfreibetrags  */
        this.TAB2 = [new Big(0), new Big(3000), new Big(2880), new Big(2760), new Big(2640), new Big(2520), new Big(2400), new Big(2280), new Big(2160), new Big(2040), new Big(1920), new Big(1800), new Big(1680), new Big(1560), new Big(1440), new Big(1320), new Big(1200), new Big(1140), new Big(1080), new Big(1020), new Big(960), new Big(900), new Big(840), new Big(780), new Big(720), new Big(660), new Big(600), new Big(540), new Big(480), new Big(420), new Big(360), new Big(300), new Big(240), new Big(180), new Big(120), new Big(60), new Big(0)];
        /**  Tabelle fuer die Zuschlaege zum Versorgungsfreibetrag  */
        this.TAB3 = [new Big(0), new Big(900), new Big(864), new Big(828), new Big(792), new Big(756), new Big(720), new Big(684), new Big(648), new Big(612), new Big(576), new Big(540), new Big(504), new Big(468), new Big(432), new Big(396), new Big(360), new Big(342), new Big(324), new Big(306), new Big(288), new Big(270), new Big(252), new Big(234), new Big(216), new Big(198), new Big(180), new Big(162), new Big(144), new Big(126), new Big(108), new Big(90), new Big(72), new Big(54), new Big(36), new Big(18), new Big(0)];
        /**  Tabelle fuer die Vomhundertsaetze des Altersentlastungsbetrags  */
        this.TAB4 = [new Big(0.0), new Big(0.4), new Big(0.384), new Big(0.368), new Big(0.352), new Big(0.336), new Big(0.32), new Big(0.304), new Big(0.288), new Big(0.272), new Big(0.256), new Big(0.24), new Big(0.224), new Big(0.208), new Big(0.192), new Big(0.176), new Big(0.16), new Big(0.152), new Big(0.144), new Big(0.136), new Big(0.128), new Big(0.12), new Big(0.112), new Big(0.104), new Big(0.096), new Big(0.088), new Big(0.08), new Big(0.072), new Big(0.064), new Big(0.056), new Big(0.048), new Big(0.04), new Big(0.032), new Big(0.024), new Big(0.016), new Big(0.008), new Big(0.0)];
        /**  Tabelle fuer die Hoechstbetraege des Altersentlastungsbetrags  */
        this.TAB5 = [new Big(0), new Big(1900), new Big(1824), new Big(1748), new Big(1672), new Big(1596), new Big(1520), new Big(1444), new Big(1368), new Big(1292), new Big(1216), new Big(1140), new Big(1064), new Big(988), new Big(912), new Big(836), new Big(760), new Big(722), new Big(684), new Big(646), new Big(608), new Big(570), new Big(532), new Big(494), new Big(456), new Big(418), new Big(380), new Big(342), new Big(304), new Big(266), new Big(228), new Big(190), new Big(152), new Big(114), new Big(76), new Big(38), new Big(0)];
        /**  Zahlenkonstanten fuer im Plan oft genutzte BigDecimal Werte  */
        this.ZAHL1 = this.Z_1;
        this.ZAHL2 = new Big(2);
        this.ZAHL3 = new Big(3);
        this.ZAHL4 = new Big(4);
        this.ZAHL5 = new Big(5);
        this.ZAHL6 = new Big(6);
        this.ZAHL7 = new Big(7);
        this.ZAHL8 = new Big(8);
        this.ZAHL9 = new Big(9);
        this.ZAHL10 = this.Z_10;
        this.ZAHL11 = new Big(11);
        this.ZAHL12 = new Big(12);
        this.ZAHL100 = new Big(100);
        this.ZAHL360 = new Big(360);
    }
    /**  PROGRAMMABLAUFPLAN 2007, PAP Seite 9  */
    Lohnsteuer2007Big.prototype.calculate = function () {
        this.MRE4LZZ();
        this.KENNZ = 0;
        this.RE4LZZ = this.RE4.sub(this.FVB).sub(this.ALTE).sub(this.WFUNDF).add(this.HINZUR);
        this.RE4LZZV = this.RE4.sub(this.FVB).sub(this.ALTE);
        this.MRE4();
        this.MZTABFB();
        this.MLSTJAHR();
        this.LSTJAHR = this.ST;
        this.JW = this.LSTJAHR.mul(this.ZAHL100);
        this.UPANTEIL();
        this.LSTLZZ = this.ANTEIL1;
        if (this.ZKF.cmp(this.Z_0) == 1) {
            this.ZTABFB = this.ZTABFB.add(this.KFB);
            this.MLSTJAHR();
            this.JBMG = this.ST;
        }
        else {
            this.JBMG = this.LSTJAHR;
        }
        this.MSOLZ();
        this.MSONST();
        this.MVMT();
    };
    /**  Freibetraege fuer Versorgungsbezuege, Altersentlastungsbetrag (§39b Abs. 2 Satz 2 EStG), PAP Seite 10  */
    Lohnsteuer2007Big.prototype.MRE4LZZ = function () {
        if (this.VBEZ.cmp(this.Z_0) == 0) {
            this.FVBZ = this.Z_0;
            this.FVB = this.Z_0;
        }
        else {
            if (this.VJAHR < 2006) {
                this.J = 1;
            }
            else {
                if (this.VJAHR < 2040) {
                    this.J = this.VJAHR - 2004;
                }
                else {
                    this.J = 36;
                }
            }
            if (this.LZZ == 1) {
                if (((this.STERBE.add(this.VKAPA)).cmp(this.Z_0)) == 1) {
                    this.VBEZB = (this.VBEZM.mul(new Big(this.ZMVB))).add(this.VBEZS);
                    this.HFVB = this.TAB2[this.J].mul(this.ZAHL100);
                    this.FVBZ = this.TAB3[this.J];
                }
                else {
                    this.VBEZB = (this.VBEZM.mul(new Big(this.ZMVB))).add(this.VBEZS);
                    /**  Achtung! Rechengenauigkeit Division?  */
                    this.HFVB = this.TAB2[this.J].div(this.ZAHL12).mul(new Big(this.ZMVB)).mul(this.ZAHL100);
                    this.FVBZ = this.TAB3[this.J].div(this.ZAHL12).mul(new Big(this.ZMVB)).round(0, Big.roundUp);
                }
            }
            else {
                this.VBEZB = ((this.VBEZM.mul(this.ZAHL12)).add(this.VBEZS)).round(2, Big.roundDown);
                this.HFVB = this.TAB2[this.J].mul(this.ZAHL100);
                this.FVBZ = this.TAB3[this.J];
            }
            this.FVB = (this.VBEZB.mul(this.TAB1[this.J])).round(2, Big.roundUp);
            if (this.FVB.cmp(this.HFVB) == 1) {
                this.FVB = this.HFVB;
            }
            this.JW = this.FVB;
            this.UPANTEIL();
            this.FVB = this.ANTEIL2;
        }
        if (this.ALTER1 == 0) {
            this.ALTE = this.Z_0;
        }
        else {
            if (this.AJAHR < 2006) {
                this.K = 1;
            }
            else {
                if (this.AJAHR < 2040) {
                    this.K = this.AJAHR - 2004;
                }
                else {
                    this.K = 36;
                }
            }
            this.BMG = this.RE4.sub(this.VBEZ);
            this.ALTE = (this.BMG.mul(this.TAB4[this.K])).round(2, Big.roundUp);
            this.JW = this.TAB5[this.K].mul(this.ZAHL100);
            this.UPANTEIL();
            if (this.ALTE.cmp(this.ANTEIL2) == 1) {
                this.ALTE = this.ANTEIL2;
            }
        }
    };
    /**  Massgeblicher Arbeitslohn fuer die Jahreslohnsteuer, PAP Seite 12  */
    Lohnsteuer2007Big.prototype.MRE4 = function () {
        if (this.LZZ == 1) {
            this.ZRE4 = this.RE4LZZ.div(this.ZAHL100).round(2, Big.roundDown);
            this.ZRE4VP = this.RE4LZZV.div(this.ZAHL100).round(2, Big.roundDown);
            this.ZVBEZ = (this.VBEZ.sub(this.FVB)).div(this.ZAHL100).round(2, Big.roundDown);
        }
        else {
            if (this.LZZ == 2) {
                this.ZRE4 = ((this.RE4LZZ.add(new Big(0.67))).mul(new Big(0.12))).round(2, Big.roundDown);
                this.ZRE4VP = ((this.RE4LZZV.add(new Big(0.67))).mul(new Big(0.12))).round(2, Big.roundDown);
                this.ZVBEZ = ((this.VBEZ.sub(this.FVB).add(new Big(0.67))).mul(new Big(0.12))).round(2, Big.roundDown);
            }
            else {
                if (this.LZZ == 3) {
                    this.ZRE4 = ((this.RE4LZZ.add(new Big(0.89))).mul(new Big(3.6))).div(new Big(7.0)).round(2, Big.roundDown);
                    this.ZRE4VP = ((this.RE4LZZV.add(new Big(0.89))).mul(new Big(3.6))).div(new Big(7.0)).round(2, Big.roundDown);
                    this.ZVBEZ = ((this.VBEZ.sub(this.FVB).add(new Big(0.89))).mul(new Big(3.6))).div(new Big(7.0)).round(2, Big.roundDown);
                }
                else {
                    this.ZRE4 = ((this.RE4LZZ.add(new Big(0.56))).mul(new Big(3.6))).round(2, Big.roundDown);
                    this.ZRE4VP = ((this.RE4LZZV.add(new Big(0.56))).mul(new Big(3.6))).round(2, Big.roundDown);
                    this.ZVBEZ = ((this.VBEZ.sub(this.FVB).add(new Big(0.56))).mul(new Big(3.6))).round(2, Big.roundDown);
                }
            }
        }
        if (this.RE4LZZ.cmp(this.Z_0) == -1) {
            this.ZRE4 = this.Z_0;
        }
        if (this.RE4LZZV.cmp(this.Z_0) == -1) {
            this.ZRE4VP = this.Z_0;
        }
        if (this.VBEZ.cmp(this.Z_0) == 0) {
            if (this.FVB.cmp(this.Z_0) == 0) {
                this.ZVBEZ = this.Z_0;
            }
        }
        else {
            if ((this.VBEZ.sub(this.FVB)).cmp(this.Z_0) == -1) {
                this.ZVBEZ = this.Z_0;
            }
        }
    };
    /**  Ermittlung der festen Tabellenfreibetraege (ohne Vorsorgepauschale), PAP Seite 13  */
    Lohnsteuer2007Big.prototype.MZTABFB = function () {
        this.ANP = this.Z_0;
        if (this.ZVBEZ.cmp(this.Z_0) >= 0) {
            if (this.ZVBEZ.cmp(this.FVBZ) == -1) {
                this.FVBZ = this.ZVBEZ.round(0, Big.roundDown);
            }
        }
        if (this.STKL < 6) {
            if (this.ZVBEZ.cmp(this.Z_0) == 1) {
                if ((this.ZVBEZ.sub(this.FVBZ)).cmp(new Big(102)) == -1) {
                    this.ANP = (this.ZVBEZ.sub(this.FVBZ)).round(0, Big.roundDown);
                }
                else {
                    this.ANP = new Big(102);
                }
            }
        }
        if (this.STKL < 6) {
            if (this.ZRE4.cmp(this.ZVBEZ) == 1) {
                if ((this.ZRE4.sub(this.ZVBEZ)).cmp(new Big(920)) == -1) {
                    this.ANP = (this.ANP.add(this.ZRE4).sub(this.ZVBEZ)).round(0, Big.roundDown);
                }
                else {
                    this.ANP = this.ANP.add(new Big(920));
                }
            }
        }
        this.KZTAB = 1;
        if (this.STKL == 1) {
            this.SAP = new Big(36);
            this.KFB = (this.ZKF.mul(new Big(5808))).round(0, Big.roundDown);
        }
        else {
            if (this.STKL == 2) {
                this.EFA = new Big(1308);
                this.SAP = new Big(36);
                this.KFB = (this.ZKF.mul(new Big(5808))).round(0, Big.roundDown);
            }
            else {
                if (this.STKL == 3) {
                    this.KZTAB = 2;
                    this.SAP = new Big(72);
                    this.KFB = (this.ZKF.mul(new Big(5808))).round(0, Big.roundDown);
                }
                else {
                    if (this.STKL == 4) {
                        this.SAP = new Big(36);
                        this.KFB = (this.ZKF.mul(new Big(2904))).round(0, Big.roundDown);
                    }
                    else {
                        this.KFB = this.Z_0;
                    }
                }
            }
        }
        this.ZTABFB = this.EFA.add(this.ANP).add(this.SAP).add(this.FVBZ);
    };
    /**  Ermittlung Jahreslohnsteuer, PAP Seite 14  */
    Lohnsteuer2007Big.prototype.MLSTJAHR = function () {
        if (this.STKL < 5) {
            this.UPEVP();
        }
        else {
            this.VSP = this.Z_0;
        }
        this.ZVE = (this.ZRE4.sub(this.ZTABFB).sub(this.VSP)).round(0, Big.roundDown);
        if (this.ZVE.cmp(this.ZAHL1) == -1) {
            this.ZVE = this.Z_0;
            this.X = this.Z_0;
        }
        else {
            this.X = this.ZVE.div(new Big(this.KZTAB)).round(0, Big.roundDown);
        }
        if (this.STKL < 5) {
            this.UPTAB07();
        }
        else {
            this.MST5_6();
        }
    };
    /**  Vorsorgepauschale (§39b Abs. 2 Satz 6 Nr 3 EStG), PAP Seite 15  */
    Lohnsteuer2007Big.prototype.UPEVP = function () {
        /**  Achtung: Es wird davon ausgegangen, dass
          a) die Rentenversicherungsbemessungsgrenze gegenueber 2006 unveraendert bleibt und
          b) der Beitragssatz zur Rentenversicherung auf 9,95 v.H. angehoben wird
         */
        if (this.KRV == 1) {
            this.VSP1 = this.Z_0;
        }
        else {
            if (this.ZRE4VP.cmp(new Big(63000)) == 1) {
                this.ZRE4VP = new Big(63000);
            }
            this.VSP1 = (this.ZRE4VP.mul(new Big(0.28))).round(2, Big.roundDown);
            this.VSP1 = (this.VSP1.mul(new Big(0.0995))).round(2, Big.roundDown);
        }
        this.VSP2 = this.ZRE4VP.mul(new Big(0.11));
        this.VHB = new Big(this.KZTAB).mul(new Big(1500));
        if (this.VSP2.cmp(this.VHB) == 1) {
            this.VSP2 = this.VHB;
        }
        this.VSPN = (this.VSP1.add(this.VSP2)).round(0, Big.roundUp);
        this.MVSP();
        if (this.VSPN.cmp(this.VSP) == 1) {
            this.VSP = this.VSPN.round(2, Big.roundDown);
        }
    };
    /**  Vorsorgepauschale (§39b Abs. 2 Satz 6 Nr 3 EStG) Vergleichsberechnung fuer Guenstigerpruefung, PAP Seite 16  */
    Lohnsteuer2007Big.prototype.MVSP = function () {
        if (this.KENNZ == 1) {
            this.VSPO = this.ZRE4VP1.mul(new Big(0.2));
        }
        else {
            this.VSPO = this.ZRE4VP.mul(new Big(0.2));
        }
        this.VSPVOR = new Big(this.KZTAB).mul(new Big(3068));
        this.VSPMAX1 = new Big(this.KZTAB).mul(new Big(1334));
        this.VSPMAX2 = new Big(this.KZTAB).mul(new Big(667));
        this.VSPKURZ = new Big(this.KZTAB).mul(new Big(1134));
        if (this.KRV == 1) {
            if (this.VSPO.cmp(this.VSPKURZ) == 1) {
                this.VSP = this.VSPKURZ;
            }
            else {
                this.VSP = this.VSPO.round(0, Big.roundDown);
            }
        }
        else {
            this.UMVSP();
        }
    };
    /**  Vorsorgepauschale, PAP Seite 17  */
    Lohnsteuer2007Big.prototype.UMVSP = function () {
        if (this.KENNZ == 1) {
            this.VSPVOR = this.VSPVOR.sub(this.ZRE4VP1.mul(new Big(0.16)));
        }
        else {
            this.VSPVOR = this.VSPVOR.sub(this.ZRE4VP.mul(new Big(0.16)));
        }
        if (this.VSPVOR.cmp(this.Z_0) == -1) {
            this.VSPVOR = this.Z_0;
        }
        if (this.VSPO.cmp(this.VSPVOR) == 1) {
            this.VSP = this.VSPVOR;
            this.VSPREST = this.VSPO.sub(this.VSPVOR);
            if (this.VSPREST.cmp(this.VSPMAX1) == 1) {
                this.VSP = this.VSP.add(this.VSPMAX1);
                this.VSPREST = (this.VSPREST.sub(this.VSPMAX1)).div(this.ZAHL2).round(2, Big.roundUp);
                if (this.VSPREST.cmp(this.VSPMAX2) == 1) {
                    this.VSP = (this.VSP.add(this.VSPMAX2)).round(0, Big.roundDown);
                }
                else {
                    this.VSP = (this.VSP.add(this.VSPREST)).round(0, Big.roundDown);
                }
            }
            else {
                this.VSP = (this.VSP.add(this.VSPREST)).round(0, Big.roundDown);
            }
        }
        else {
            this.VSP = this.VSPO.round(0, Big.roundDown);
        }
    };
    /**  Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 8 EStG), PAP Seite 18  */
    Lohnsteuer2007Big.prototype.MST5_6 = function () {
        this.ZZX = this.X;
        if (this.ZZX.cmp(new Big(25812)) == 1) {
            this.ZX = new Big(25812);
            this.UP5_6();
            if (this.ZZX.cmp(new Big(200000)) == 1) {
                this.ST = (this.ST.add(new Big(73158.96))).round(0, Big.roundDown);
                ;
                this.ST = (this.ST.add((this.ZZX.sub(new Big(200000))).mul(new Big(0.45)))).round(0, Big.roundDown);
            }
            else {
                this.ST = (this.ST.add((this.ZZX.sub(new Big(25812))).mul(new Big(0.42)))).round(0, Big.roundDown);
            }
        }
        else {
            this.ZX = this.ZZX;
            this.UP5_6();
            if (this.ZZX.cmp(new Big(9144)) == 1) {
                this.VERGL = this.ST;
                this.ZX = new Big(9144);
                this.UP5_6();
                this.HOCH = (this.ST.add((this.ZZX.sub(new Big(9144))).mul(new Big(0.42)))).round(0, Big.roundDown);
                if (this.HOCH.cmp(this.VERGL) == -1) {
                    this.ST = this.HOCH;
                }
                else {
                    this.ST = this.VERGL;
                }
            }
        }
    };
    /**  Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 8 EStG), PAP Seite 18  */
    Lohnsteuer2007Big.prototype.UP5_6 = function () {
        this.X = this.ZX.mul(new Big(1.25));
        this.UPTAB07();
        this.ST1 = this.ST;
        this.X = this.ZX.mul(new Big(0.75));
        this.UPTAB07();
        this.ST2 = this.ST;
        this.DIFF = (this.ST1.sub(this.ST2)).mul(this.ZAHL2);
        this.MIST = (this.ZX.mul(new Big(0.15))).round(0, Big.roundDown);
        if (this.MIST.cmp(this.DIFF) == 1) {
            this.ST = this.MIST;
        }
        else {
            this.ST = this.DIFF;
        }
    };
    /**  Solidaritaetszuschlag, PAP Seite 19  */
    Lohnsteuer2007Big.prototype.MSOLZ = function () {
        this.SOLZFREI = new Big(972 * this.KZTAB);
        if (this.JBMG.cmp(this.SOLZFREI) == 1) {
            this.SOLZJ = (this.JBMG.mul(new Big(5.5))).div(this.ZAHL100).round(2, Big.roundDown);
            this.SOLZMIN = (this.JBMG.sub(this.SOLZFREI)).mul(new Big(20)).div(this.ZAHL100);
            if (this.SOLZMIN.cmp(this.SOLZJ) == -1) {
                this.SOLZJ = this.SOLZMIN;
            }
            this.JW = this.SOLZJ.mul(this.ZAHL100).round(0, Big.roundDown);
            this.UPANTEIL();
            this.SOLZLZZ = this.ANTEIL1;
        }
        else {
            this.SOLZLZZ = this.Z_0;
        }
        if (this.R > 0) {
            this.JW = this.JBMG.mul(this.ZAHL100);
            this.UPANTEIL();
            this.BK = this.ANTEIL1;
        }
        else {
            this.BK = this.Z_0;
        }
    };
    /**  Anteil von Jahresbetraegen fuer einen LZZ (§ 39b Abs. 2 Satz 10 EStG), PAP Seite 20  */
    Lohnsteuer2007Big.prototype.UPANTEIL = function () {
        if (this.LZZ == 1) {
            this.ANTEIL1 = this.JW;
            this.ANTEIL2 = this.JW;
        }
        else {
            if (this.LZZ == 2) {
                this.ANTEIL1 = this.JW.div(this.ZAHL12).round(0, Big.roundDown);
                this.ANTEIL2 = this.JW.div(this.ZAHL12).round(0, Big.roundUp);
            }
            else {
                if (this.LZZ == 3) {
                    this.ANTEIL1 = (this.JW.mul(this.ZAHL7)).div(this.ZAHL360).round(0, Big.roundDown);
                    this.ANTEIL2 = (this.JW.mul(this.ZAHL7)).div(this.ZAHL360).round(0, Big.roundUp);
                }
                else {
                    this.ANTEIL1 = this.JW.div(this.ZAHL360).round(0, Big.roundDown);
                    this.ANTEIL2 = this.JW.div(this.ZAHL360).round(0, Big.roundUp);
                }
            }
        }
    };
    /**  Berechnung sonstiger Bezuege nach § 39b Abs. 3 Saetze 1 bis 7 EStG), PAP Seite 21  */
    Lohnsteuer2007Big.prototype.MSONST = function () {
        if (this.SONSTB.cmp(this.Z_0) == 0) {
            this.STS = this.Z_0;
            this.SOLZS = this.Z_0;
            this.BKS = this.Z_0;
        }
        else {
            this.LZZ = 1;
            this.VBEZ = this.JVBEZ;
            this.RE4 = this.JRE4;
            this.MRE4LZZ();
            this.MRE4LZZ2();
            this.MLSTJAHR();
            this.LST1 = this.ST.mul(this.ZAHL100);
            this.VBEZ = this.JVBEZ.add(this.VBS);
            this.RE4 = this.JRE4.add(this.SONSTB);
            this.VBEZS = this.VBEZS.add(this.STERBE);
            this.MRE4LZZ();
            this.MRE4LZZ2();
            this.MLSTJAHR();
            this.LST2 = this.ST.mul(this.ZAHL100);
            this.STS = this.LST2.sub(this.LST1);
            if (this.SONSTB.cmp(this.Z_0) == 1) {
                if (this.STS.cmp(this.Z_0) == -1) {
                    this.STS = this.Z_0;
                }
            }
            this.SOLZS = this.STS.mul(new Big(5.5)).div(this.ZAHL100).round(0, Big.roundDown);
            if (this.R > 0) {
                this.BKS = this.STS;
            }
            else {
                this.BKS = this.Z_0;
            }
        }
    };
    /**  Berechnung sonstiger Bezuege nach § 39b Abs. 3 Saetze 1 bis 7 EStG)
         PAP Seite 21  */
    Lohnsteuer2007Big.prototype.MRE4LZZ2 = function () {
        this.RE4LZZ = this.RE4.sub(this.FVB).sub(this.ALTE).sub(this.JFREIB).add(this.JHINZU);
        this.RE4LZZV = this.RE4.sub(this.FVB).sub(this.ALTE);
        this.MRE4();
        this.MZTABFB();
    };
    /**  Berechnung der Verguetung fuer mehrjaehrige Taetigkeit nach § 39b Abs. 3 Satz 9 EStG), PAP Seite 22  */
    Lohnsteuer2007Big.prototype.MVMT = function () {
        if (this.VKAPA.cmp(this.Z_0) == -1) {
            this.VKAPA = this.Z_0;
        }
        if ((this.VMT.add(this.VKAPA)).cmp(this.Z_0) == 1) {
            this.LZZ = 1;
            this.VBEZ = this.JVBEZ.add(this.VBS);
            this.RE4 = this.JRE4.add(this.SONSTB);
            this.MRE4LZZ();
            this.MRE4LZZ2();
            this.MLSTJAHR();
            this.LST1 = this.ST.mul(this.ZAHL100);
            this.VMT = this.VMT.add(this.VKAPA);
            this.VBEZS = this.VBEZS.add(this.VKAPA);
            this.VBEZ = this.VBEZ.add(this.VKAPA);
            this.RE4 = this.JRE4.add(this.SONSTB).add(this.VMT);
            this.MRE4LZZ();
            this.MRE4LZZ2();
            this.KENNZ = 1;
            this.ZRE4VP1 = this.ZRE4VP;
            this.MLSTJAHR();
            this.LST3 = this.ST.mul(this.ZAHL100);
            this.VBEZ = this.VBEZ.sub(this.VKAPA);
            this.VBEZS = this.VBEZS.sub(this.VKAPA);
            this.RE4 = this.JRE4.add(this.SONSTB);
            this.MRE4LZZ();
            if ((this.RE4.sub(this.JFREIB).add(this.JHINZU)).cmp(this.Z_0) == -1) {
                this.RE4 = this.RE4.sub(this.JFREIB).add(this.JHINZU);
                this.JFREIB = this.Z_0;
                this.JHINZU = this.Z_0;
                this.RE4 = (this.RE4.add(this.VMT)).div(this.ZAHL5).round(0, Big.roundDown);
                this.MRE4LZZ2();
                this.MLSTJAHR();
                this.LST2 = this.ST.mul(this.ZAHL100);
                this.STV = this.LST2.mul(this.ZAHL5);
            }
            else {
                this.RE4 = this.RE4.add(this.VMT.div(this.ZAHL5).round(0, Big.roundDown));
                this.MRE4LZZ2();
                this.MLSTJAHR();
                this.LST2 = this.ST.mul(this.ZAHL100);
                this.STV = (this.LST2.sub(this.LST1)).mul(this.ZAHL5);
            }
            this.LST3 = this.LST3.sub(this.LST1);
            if (this.LST3.cmp(this.STV) == -1) {
                this.STV = this.LST3;
            }
            this.SOLZV = (this.STV.mul(new Big(5.5))).div(this.ZAHL100).round(0, Big.roundDown);
            if (this.R > 0) {
                this.BKV = this.STV;
            }
            else {
                this.BKV = this.Z_0;
            }
        }
        else {
            this.STV = this.Z_0;
            this.SOLZV = this.Z_0;
            this.BKV = this.Z_0;
        }
    };
    /**  Tarifliche Einkommensteuer §32a EStG, PAP Seite 23  */
    Lohnsteuer2007Big.prototype.UPTAB07 = function () {
        if (this.X.cmp(new Big(7665)) == -1) {
            this.ST = this.Z_0;
        }
        else {
            if (this.X.cmp(new Big(12740)) == -1) {
                this.Y = (this.X.sub(new Big(7664))).div(new Big(10000)).round(6, Big.roundDown);
                this.RW = this.Y.mul(new Big(883.74));
                this.RW = this.RW.add(new Big(1500));
                this.ST = (this.RW.mul(this.Y)).round(0, Big.roundDown);
            }
            else {
                if (this.X.cmp(new Big(52152)) == -1) {
                    this.Y = (this.X.sub(new Big(12739))).div(new Big(10000)).round(6, Big.roundDown);
                    this.RW = this.Y.mul(new Big(228.74));
                    this.RW = this.RW.add(new Big(2397));
                    this.RW = this.RW.mul(this.Y);
                    this.ST = (this.RW.add(new Big(989))).round(0, Big.roundDown);
                }
                else {
                    if (this.X.cmp(new Big(250001)) == -1) {
                        this.ST = ((this.X.mul(new Big(0.42))).sub(new Big(7914))).round(0, Big.roundDown);
                    }
                    else {
                        this.ST = ((this.X.mul(new Big(0.45))).sub(new Big(15414))).round(0, Big.roundDown);
                    }
                }
            }
        }
        this.ST = this.ST.mul(new Big(this.KZTAB));
    };
    /**
     * Getter for AJAHR.
     * <p>
     *  Auf die Vollendung des 64. Lebensjahres folgende
             Kalenderjahr (erforderlich, wenn ALTER1=1)
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getAJAHR = function () {
        return this.AJAHR;
    };
    /**
     * Setter for AJAHR.
     * <p>
     *  Auf die Vollendung des 64. Lebensjahres folgende
             Kalenderjahr (erforderlich, wenn ALTER1=1)
     * <p>
     * @param {number} AJAHR input value
     */
    Lohnsteuer2007Big.prototype.setAJAHR = function (AJAHR) {
        this.AJAHR = AJAHR;
    };
    /**
     * Getter for ALTER1.
     * <p>
     *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
             der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getALTER1 = function () {
        return this.ALTER1;
    };
    /**
     * Setter for ALTER1.
     * <p>
     *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
             der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0
     * <p>
     * @param {number} ALTER1 input value
     */
    Lohnsteuer2007Big.prototype.setALTER1 = function (ALTER1) {
        this.ALTER1 = ALTER1;
    };
    /**
     * Getter for HINZUR.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
             fuer den Lohnzahlungszeitraum in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getHINZUR = function () {
        return this.HINZUR;
    };
    /**
     * Setter for HINZUR.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
             fuer den Lohnzahlungszeitraum in Cents
     * <p>
     * @param {Big} HINZUR input value
     */
    Lohnsteuer2007Big.prototype.setHINZUR = function (HINZUR) {
        this.HINZUR = HINZUR;
    };
    /**
     * Getter for JFREIB.
     * <p>
     *  Jahresfreibetrag nach Ma&szlig;gabe der Eintragungen auf der
             Lohnsteuerkarte in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getJFREIB = function () {
        return this.JFREIB;
    };
    /**
     * Setter for JFREIB.
     * <p>
     *  Jahresfreibetrag nach Ma&szlig;gabe der Eintragungen auf der
             Lohnsteuerkarte in Cents (ggf. 0)
     * <p>
     * @param {Big} JFREIB input value
     */
    Lohnsteuer2007Big.prototype.setJFREIB = function (JFREIB) {
        this.JFREIB = JFREIB;
    };
    /**
     * Getter for JHINZU.
     * <p>
     *  Jahreshinzurechnungsbetrag in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getJHINZU = function () {
        return this.JHINZU;
    };
    /**
     * Setter for JHINZU.
     * <p>
     *  Jahreshinzurechnungsbetrag in Cents (ggf. 0)
     * <p>
     * @param {Big} JHINZU input value
     */
    Lohnsteuer2007Big.prototype.setJHINZU = function (JHINZU) {
        this.JHINZU = JHINZU;
    };
    /**
     * Getter for JRE4.
     * <p>
     *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezuege und
             ohne Verguetung fuer mehrjaehrige Taetigkeit in Cents (ggf. 0)
             Anmerkung: Die Eingabe dieses Feldes ist erforderlich bei Eingabe
             „sonstiger Bezuege“ (Feld SONSTB) oder bei Eingabe der „Verguetung
             fuer mehrjaehrige Taetigkeit“ (Feld VMT).
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getJRE4 = function () {
        return this.JRE4;
    };
    /**
     * Setter for JRE4.
     * <p>
     *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezuege und
             ohne Verguetung fuer mehrjaehrige Taetigkeit in Cents (ggf. 0)
             Anmerkung: Die Eingabe dieses Feldes ist erforderlich bei Eingabe
             „sonstiger Bezuege“ (Feld SONSTB) oder bei Eingabe der „Verguetung
             fuer mehrjaehrige Taetigkeit“ (Feld VMT).
     * <p>
     * @param {Big} JRE4 input value
     */
    Lohnsteuer2007Big.prototype.setJRE4 = function (JRE4) {
        this.JRE4 = JRE4;
    };
    /**
     * Getter for JVBEZ.
     * <p>
     *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getJVBEZ = function () {
        return this.JVBEZ;
    };
    /**
     * Setter for JVBEZ.
     * <p>
     *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @param {Big} JVBEZ input value
     */
    Lohnsteuer2007Big.prototype.setJVBEZ = function (JVBEZ) {
        this.JVBEZ = JVBEZ;
    };
    /**
     * Getter for KRV.
     * <p>
     *  1 = der Arbeitnehmer ist im Lohnzahlungszeitraum in der gesetzlichen
             Rentenversicherung versicherungsfrei und gehoert zu den in
             § 10 c Abs. 3 EStG genannten Personen.
             Bei anderen Arbeitnehmern ist „0“ einzusetzen.
             Fuer die Zuordnung sind allein die dem Arbeitgeber ohnehin bekannten
             Tatsachen ma&szlig;gebend; zusaetzliche Ermittlungen braucht
             der Arbeitgeber nicht anzustellen.
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getKRV = function () {
        return this.KRV;
    };
    /**
     * Setter for KRV.
     * <p>
     *  1 = der Arbeitnehmer ist im Lohnzahlungszeitraum in der gesetzlichen
             Rentenversicherung versicherungsfrei und gehoert zu den in
             § 10 c Abs. 3 EStG genannten Personen.
             Bei anderen Arbeitnehmern ist „0“ einzusetzen.
             Fuer die Zuordnung sind allein die dem Arbeitgeber ohnehin bekannten
             Tatsachen ma&szlig;gebend; zusaetzliche Ermittlungen braucht
             der Arbeitgeber nicht anzustellen.
     * <p>
     * @param {number} KRV input value
     */
    Lohnsteuer2007Big.prototype.setKRV = function (KRV) {
        this.KRV = KRV;
    };
    /**
     * Getter for LZZ.
     * <p>
     *  Lohnzahlungszeitraum:
             1 = Jahr
             2 = Monat
             3 = Woche
             4 = Tag
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getLZZ = function () {
        return this.LZZ;
    };
    /**
     * Setter for LZZ.
     * <p>
     *  Lohnzahlungszeitraum:
             1 = Jahr
             2 = Monat
             3 = Woche
             4 = Tag
     * <p>
     * @param {number} LZZ input value
     */
    Lohnsteuer2007Big.prototype.setLZZ = function (LZZ) {
        this.LZZ = LZZ;
    };
    /**
     * Getter for R.
     * <p>
     *  Religionsgemeinschaft des Arbeitnehmers lt. Lohnsteuerkarte (bei
             keiner Religionszugehoerigkeit = 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getR = function () {
        return this.R;
    };
    /**
     * Setter for R.
     * <p>
     *  Religionsgemeinschaft des Arbeitnehmers lt. Lohnsteuerkarte (bei
             keiner Religionszugehoerigkeit = 0)
     * <p>
     * @param {number} R input value
     */
    Lohnsteuer2007Big.prototype.setR = function (R) {
        this.R = R;
    };
    /**
     * Getter for RE4.
     * <p>
     *  Steuerpflichtiger Arbeitslohn vor Beruecksichtigung der Freibetraege
             fuer Versorgungsbezuege, des Altersentlastungsbetrags und des auf
             der Lohnsteuerkarte fuer den Lohnzahlungszeitraum eingetragenen
             Freibetrags in Cents.
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getRE4 = function () {
        return this.RE4;
    };
    /**
     * Setter for RE4.
     * <p>
     *  Steuerpflichtiger Arbeitslohn vor Beruecksichtigung der Freibetraege
             fuer Versorgungsbezuege, des Altersentlastungsbetrags und des auf
             der Lohnsteuerkarte fuer den Lohnzahlungszeitraum eingetragenen
             Freibetrags in Cents.
     * <p>
     * @param {Big} RE4 input value
     */
    Lohnsteuer2007Big.prototype.setRE4 = function (RE4) {
        this.RE4 = RE4;
    };
    /**
     * Getter for SONSTB.
     * <p>
     *  Sonstige Bezuege (ohne Verguetung aus mehrjaehriger Taetigkeit) einschliesslich
             Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
             soweit es sich nicht um Bezuege fuer mehrere Jahre handelt in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getSONSTB = function () {
        return this.SONSTB;
    };
    /**
     * Setter for SONSTB.
     * <p>
     *  Sonstige Bezuege (ohne Verguetung aus mehrjaehriger Taetigkeit) einschliesslich
             Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
             soweit es sich nicht um Bezuege fuer mehrere Jahre handelt in Cents (ggf. 0)
     * <p>
     * @param {Big} SONSTB input value
     */
    Lohnsteuer2007Big.prototype.setSONSTB = function (SONSTB) {
        this.SONSTB = SONSTB;
    };
    /**
     * Getter for STERBE.
     * <p>
     *  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
             soweit es sich nicht um Bezuege fuer mehrere Jahre handelt
             (in SONSTB enthalten) in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getSTERBE = function () {
        return this.STERBE;
    };
    /**
     * Setter for STERBE.
     * <p>
     *  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
             soweit es sich nicht um Bezuege fuer mehrere Jahre handelt
             (in SONSTB enthalten) in Cents
     * <p>
     * @param {Big} STERBE input value
     */
    Lohnsteuer2007Big.prototype.setSTERBE = function (STERBE) {
        this.STERBE = STERBE;
    };
    /**
     * Getter for STKL.
     * <p>
     *  Steuerklasse:
             1 = I
             2 = II
             3 = III
             4 = IV
             5 = V
             6 = VI
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getSTKL = function () {
        return this.STKL;
    };
    /**
     * Setter for STKL.
     * <p>
     *  Steuerklasse:
             1 = I
             2 = II
             3 = III
             4 = IV
             5 = V
             6 = VI
     * <p>
     * @param {number} STKL input value
     */
    Lohnsteuer2007Big.prototype.setSTKL = function (STKL) {
        this.STKL = STKL;
    };
    /**
     * Getter for VBEZ.
     * <p>
     *  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getVBEZ = function () {
        return this.VBEZ;
    };
    /**
     * Setter for VBEZ.
     * <p>
     *  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @param {Big} VBEZ input value
     */
    Lohnsteuer2007Big.prototype.setVBEZ = function (VBEZ) {
        this.VBEZ = VBEZ;
    };
    /**
     * Getter for VBEZM.
     * <p>
     *  Vorsorgungsbezug im Januar 2005 bzw. fuer den ersten vollen Monat
             in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getVBEZM = function () {
        return this.VBEZM;
    };
    /**
     * Setter for VBEZM.
     * <p>
     *  Vorsorgungsbezug im Januar 2005 bzw. fuer den ersten vollen Monat
             in Cents
     * <p>
     * @param {Big} VBEZM input value
     */
    Lohnsteuer2007Big.prototype.setVBEZM = function (VBEZM) {
        this.VBEZM = VBEZM;
    };
    /**
     * Getter for VBEZS.
     * <p>
     *  Voraussichtliche Sonderzahlungen im Kalenderjahr des Versorgungsbeginns
             bei Versorgungsempfaengern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen
             bei Versorgungsbezuegen in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getVBEZS = function () {
        return this.VBEZS;
    };
    /**
     * Setter for VBEZS.
     * <p>
     *  Voraussichtliche Sonderzahlungen im Kalenderjahr des Versorgungsbeginns
             bei Versorgungsempfaengern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen
             bei Versorgungsbezuegen in Cents
     * <p>
     * @param {Big} VBEZS input value
     */
    Lohnsteuer2007Big.prototype.setVBEZS = function (VBEZS) {
        this.VBEZS = VBEZS;
    };
    /**
     * Getter for VBS.
     * <p>
     *  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld
            in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getVBS = function () {
        return this.VBS;
    };
    /**
     * Setter for VBS.
     * <p>
     *  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld
            in Cents (ggf. 0)
     * <p>
     * @param {Big} VBS input value
     */
    Lohnsteuer2007Big.prototype.setVBS = function (VBS) {
        this.VBS = VBS;
    };
    /**
     * Getter for VJAHR.
     * <p>
     *  Jahr, in dem der Versorgungsbezug erstmalig gewaehrt wurde; werden
             mehrere Versorgungsbezuege gezahlt, so gilt der aelteste erstmalige Bezug
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getVJAHR = function () {
        return this.VJAHR;
    };
    /**
     * Setter for VJAHR.
     * <p>
     *  Jahr, in dem der Versorgungsbezug erstmalig gewaehrt wurde; werden
             mehrere Versorgungsbezuege gezahlt, so gilt der aelteste erstmalige Bezug
     * <p>
     * @param {number} VJAHR input value
     */
    Lohnsteuer2007Big.prototype.setVJAHR = function (VJAHR) {
        this.VJAHR = VJAHR;
    };
    /**
     * Getter for VKAPA.
     * <p>
     *  Kapitalauszahlungen/Abfindungen bei Versorgungsbezuegen fuer mehrere Jahre in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getVKAPA = function () {
        return this.VKAPA;
    };
    /**
     * Setter for VKAPA.
     * <p>
     *  Kapitalauszahlungen/Abfindungen bei Versorgungsbezuegen fuer mehrere Jahre in Cents (ggf. 0)
     * <p>
     * @param {Big} VKAPA input value
     */
    Lohnsteuer2007Big.prototype.setVKAPA = function (VKAPA) {
        this.VKAPA = VKAPA;
    };
    /**
     * Getter for VMT.
     * <p>
     *  Verguetung fuer mehrjaehrige Taetigkeit ohne Kapitalauszahlungen/Abfindungen bei
             Versorgungsbezuegen in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getVMT = function () {
        return this.VMT;
    };
    /**
     * Setter for VMT.
     * <p>
     *  Verguetung fuer mehrjaehrige Taetigkeit ohne Kapitalauszahlungen/Abfindungen bei
             Versorgungsbezuegen in Cents (ggf. 0)
     * <p>
     * @param {Big} VMT input value
     */
    Lohnsteuer2007Big.prototype.setVMT = function (VMT) {
        this.VMT = VMT;
    };
    /**
     * Getter for WFUNDF.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag
             fuer den Lohnzahlungszeitraum in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getWFUNDF = function () {
        return this.WFUNDF;
    };
    /**
     * Setter for WFUNDF.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag
             fuer den Lohnzahlungszeitraum in Cents
     * <p>
     * @param {Big} WFUNDF input value
     */
    Lohnsteuer2007Big.prototype.setWFUNDF = function (WFUNDF) {
        this.WFUNDF = WFUNDF;
    };
    /**
     * Getter for ZKF.
     * <p>
     *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
             I, II, III und IV)
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getZKF = function () {
        return this.ZKF;
    };
    /**
     * Setter for ZKF.
     * <p>
     *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
             I, II, III und IV)
     * <p>
     * @param {Big} ZKF input value
     */
    Lohnsteuer2007Big.prototype.setZKF = function (ZKF) {
        this.ZKF = ZKF;
    };
    /**
     * Getter for ZMVB.
     * <p>
     *  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
             erforderlich bei Jahresberechnung (LZZ = 1)
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getZMVB = function () {
        return this.ZMVB;
    };
    /**
     * Setter for ZMVB.
     * <p>
     *  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
             erforderlich bei Jahresberechnung (LZZ = 1)
     * <p>
     * @param {number} ZMVB input value
     */
    Lohnsteuer2007Big.prototype.setZMVB = function (ZMVB) {
        this.ZMVB = ZMVB;
    };
    /**
     * Getter for BK.
     * <p>
     *  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getBK = function () {
        return this.BK;
    };
    /**
     * Getter for BKS.
     * <p>
     *  Bemessungsgrundlage der sonstigen Einkuenfte (ohne Verguetung
             fuer mehrjaehrige Taetigkeit) fuer die Kirchenlohnsteuer in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getBKS = function () {
        return this.BKS;
    };
    /**
     * Getter for BKV.
     * <p>
     *  Bemessungsgrundlage der sonstigen Einkuenfte (ohne Verguetung
             fuer mehrjaehrige Taetigkeit) fuer die Kirchenlohnsteuer in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getBKV = function () {
        return this.BKV;
    };
    /**
     * Getter for LSTLZZ.
     * <p>
     *  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getLSTLZZ = function () {
        return this.LSTLZZ;
    };
    /**
     * Getter for SOLZLZZ.
     * <p>
     *  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
             in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getSOLZLZZ = function () {
        return this.SOLZLZZ;
    };
    /**
     * Getter for SOLZS.
     * <p>
     *  Solidaritaetszuschlag fuer sonstige Bezuege (ohne Verguetung fuer mehrjaehrige
             Taetigkeit) in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getSOLZS = function () {
        return this.SOLZS;
    };
    /**
     * Getter for SOLZV.
     * <p>
     *  Solidaritaetszuschlag fuer die Verguetung fuer mehrjaehrige Taetigkeit in
             Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getSOLZV = function () {
        return this.SOLZV;
    };
    /**
     * Getter for STS.
     * <p>
     *  Lohnsteuer fuer sonstige Einkuenfte (ohne Verguetung fuer mehrjaehrige
             Taetigkeit) in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getSTS = function () {
        return this.STS;
    };
    /**
     * Getter for STV.
     * <p>
     *  Lohnsteuer fuer Verguetung fuer mehrjaehrige Taetigkeit in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2007Big.prototype.getSTV = function () {
        return this.STV;
    };
    /**
     * Initialize all inputs values with zero.
     */
    Lohnsteuer2007Big.prototype.initInputs = function () {
        this.HINZUR = this.JFREIB = this.JHINZU = this.JRE4 = this.JVBEZ = this.RE4 = this.SONSTB = this.STERBE = this.VBEZ = this.VBEZM = this.VBEZS = this.VBS = this.VKAPA = this.VMT = this.WFUNDF = this.ZKF = this.Z_0;
        this.AJAHR = this.ALTER1 = this.KRV = this.LZZ = this.R = this.STKL = this.VJAHR = this.ZMVB = 0;
    };
    // not realy clean, but for ts compiler
    Lohnsteuer2007Big.prototype.isBigInput = function (name, value) {
        return value instanceof Big;
    };
    /**
     * Setter for Big or number input parameters.
     *
     * @param {string} name Variable name to set.
     * @param {number} value Value to set.
     */
    Lohnsteuer2007Big.prototype.set = function (name, value) {
        if (!this.hasOwnProperty(name)) {
            throw new Error("Unknown parameter " + name);
        }
        if (this.isBigInput(name, value)) {
            if (value instanceof Big) {
                this[name] = value;
            }
        }
        else if (!(value instanceof Big)) {
            this[name] = value;
        }
    };
    /**
     * Getter for all output parameters. You get a value of type "number or "Big".
     *
     * @param {string} name Variable name to get.
     */
    Lohnsteuer2007Big.prototype.get = function (name) {
        if (this.hasOwnProperty(name)) {
            return this[name];
        }
        throw new Error("Unknown parameter " + name);
    };
    /**
     * Get all fields with types.
     */
    Lohnsteuer2007Big.prototype.getDirectory = function () {
        return Lohnsteuer2007Big.typeDirectory;
    };
    /**
     * Converts a value (number or Big) in the correct type (number or Big).
     *
     * @param {string} name the name of the value
     * @param {TaxJsValueType} value the value to convert
     */
    Lohnsteuer2007Big.prototype.toType = function (name, value) {
        var info = Lohnsteuer2007Big.typeDirectory[name];
        if (!info) {
            throw new Error("Unknown parameter " + name);
        }
        if (typeof value == "number" && info.type != "number") {
            return new Big(value);
        }
        if (typeof value == "object" && info.type == "number") {
            return value.toNumber();
        }
        return value;
    };
    Lohnsteuer2007Big._n = "number";
    Lohnsteuer2007Big._b = "Big";
    Lohnsteuer2007Big._i = "input";
    Lohnsteuer2007Big._o = "output";
    Lohnsteuer2007Big._s = "STANDARD";
    Lohnsteuer2007Big._d = "DBA";
    Lohnsteuer2007Big.typeDirectory = {
        "AJAHR": { type: Lohnsteuer2007Big._n, direction: Lohnsteuer2007Big._i }, "ALTER1": { type: Lohnsteuer2007Big._n, direction: Lohnsteuer2007Big._i }, "HINZUR": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "JFREIB": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "JHINZU": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "JRE4": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "JVBEZ": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "KRV": { type: Lohnsteuer2007Big._n, direction: Lohnsteuer2007Big._i }, "LZZ": { type: Lohnsteuer2007Big._n, direction: Lohnsteuer2007Big._i }, "R": { type: Lohnsteuer2007Big._n, direction: Lohnsteuer2007Big._i }, "RE4": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "SONSTB": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "STERBE": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "STKL": { type: Lohnsteuer2007Big._n, direction: Lohnsteuer2007Big._i }, "VBEZ": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "VBEZM": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "VBEZS": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "VBS": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "VJAHR": { type: Lohnsteuer2007Big._n, direction: Lohnsteuer2007Big._i }, "VKAPA": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "VMT": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "WFUNDF": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "ZKF": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._i }, "ZMVB": { type: Lohnsteuer2007Big._n, direction: Lohnsteuer2007Big._i }, "BK": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._o, group: Lohnsteuer2007Big._s }, "BKS": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._o, group: Lohnsteuer2007Big._s }, "BKV": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._o, group: Lohnsteuer2007Big._s }, "LSTLZZ": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._o, group: Lohnsteuer2007Big._s }, "SOLZLZZ": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._o, group: Lohnsteuer2007Big._s }, "SOLZS": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._o, group: Lohnsteuer2007Big._s }, "SOLZV": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._o, group: Lohnsteuer2007Big._s }, "STS": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._o, group: Lohnsteuer2007Big._s }, "STV": { type: Lohnsteuer2007Big._b, direction: Lohnsteuer2007Big._o, group: Lohnsteuer2007Big._s },
    };
    return Lohnsteuer2007Big;
}());
//# sourceMappingURL=Lohnsteuer2007Big.js.map