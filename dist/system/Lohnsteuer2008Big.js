System.register(["big.js"], function (exports_1, context_1) {
    "use strict";
    var big_js_1, Lohnsteuer2008Big;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (big_js_1_1) {
                big_js_1 = big_js_1_1;
            }
        ],
        execute: function () {
            /**
            * Steuerberechnungsklasse.
            *
            * Generiert aus Pseudocode von: <a href="https://www.bmf-steuerrechner.de">bmf-steuerrechner</a>
            *
            */
            Lohnsteuer2008Big = /** @class */ (function () {
                function Lohnsteuer2008Big() {
                    this.Z_0 = new big_js_1.default(0);
                    this.Z_1 = new big_js_1.default(1);
                    this.Z_10 = new big_js_1.default(10);
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
                    /**  Altersentlastungsbetrag nach AlterseinkÃ¼nftegesetz in â‚¬,
                         Cent (2 Dezimalstellen)  */
                    this.ALTE = this.Z_0;
                    /**  Arbeitnehmer-Pauschbetrag in EURO  */
                    this.ANP = this.Z_0;
                    /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
                         auf ganze Cents abgerundet  */
                    this.ANTEIL1 = this.Z_0;
                    /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
                         auf ganze Cents aufgerundet  */
                    this.ANTEIL2 = this.Z_0;
                    /**  Bemessungsgrundlage fÃ¼r Altersentlastungsbetrag in â‚¬, Cent
                         (2 Dezimalstellen)  */
                    this.BMG = this.Z_0;
                    /**  Differenz zwischen ST1 und ST2 in EURO  */
                    this.DIFF = this.Z_0;
                    /**  Entlastungsbetrag fuer Alleinerziehende in EURO  */
                    this.EFA = this.Z_0;
                    /**  Versorgungsfreibetrag in â‚¬, Cent (2 Dezimalstellen)  */
                    this.FVB = this.Z_0;
                    /**  Versorgungsfreibetrag in â‚¬, Cent (2 Dezimalstellen) fÃ¼r die Berechnung
                         der Lohnsteuer fÃ¼r den sonstigen Bezug  */
                    this.FVBSO = this.Z_0;
                    /**  Zuschlag zum Versorgungsfreibetrag in EURO  */
                    this.FVBZ = this.Z_0;
                    /**  Zuschlag zum Versorgungsfreibetrag in EURO fuer die Berechnung
                         der Lohnsteuer beim sonstigen Bezug  */
                    this.FVBZSO = this.Z_0;
                    /**  Sicherungsfeld fÃ¼r den Zuschlag zum Versorgungsfreibetrag in â‚¬ fÃ¼r
                         die Berechnung der Lohnsteuer fÃ¼r die VergÃ¼tung fÃ¼r mehrjÃ¤hrige
                         TÃ¤tigkeit  */
                    this.FVBZOSO = this.Z_0;
                    /**  Maximaler Altersentlastungsbetrag in â‚¬  */
                    this.HBALTE = this.Z_0;
                    /**  MaÃŸgeblicher maximaler Versorgungsfreibetrag in â‚¬  */
                    this.HFVB = this.Z_0;
                    /**  MaÃŸgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in â‚¬,Cent
                         (2 Dezimalstellen)  */
                    this.HFVBZ = this.Z_0;
                    /**  MaÃŸgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in â‚¬, Cent
                         (2 Dezimalstellen) fÃ¼r die Berechnung der Lohnsteuer fÃ¼r den
                         sonstigen Bezug  */
                    this.HFVBZSO = this.Z_0;
                    /**  Nummer der Tabellenwerte fuer Versorgungsparameter  */
                    this.J = 0;
                    /**  Jahressteuer nach Â§ 51a EStG, aus der Solidaritaetszuschlag und
                         Bemessungsgrundlage fuer die Kirchenlohnsteuer ermittelt werden in EURO  */
                    this.JBMG = this.Z_0;
                    /**  Auf einen Jahreslohn hochgerechneter LZZFREIB in â‚¬, Cent
                         (2 Dezimalstellen)  */
                    this.JLFREIB = this.Z_0;
                    /**  Auf einen Jahreslohn hochgerechnete LZZHINZU in â‚¬, Cent
                         (2 Dezimalstellen)  */
                    this.JLHINZU = this.Z_0;
                    /**  Jahreswert, dessen Anteil fuer einen Lohnzahlungszeitraum in
                         UPANTEIL errechnet werden soll in Cents  */
                    this.JW = this.Z_0;
                    /**  Nummer der Tabellenwerte fuer Parameter bei Altersentlastungsbetrag  */
                    this.K = 0;
                    /**  Merker fÃ¼r Berechnung Lohnsteuer fÃ¼r mehrjÃ¤hrige TÃ¤tigkeit.
                         0 = normale Steuerberechnung
                         1 = Steuerberechnung fÃ¼r mehrjÃ¤hrige TÃ¤tigkeit
                         2 = Steuerberechnung fÃ¼r mehrjÃ¤hrige TÃ¤tigkeit Sonderfall nach Â§ 34 Abs. 1 Satz 3 EStG  */
                    this.KENNVMT = 0;
                    /**  Summe der Freibetraege fuer Kinder in EURO  */
                    this.KFB = this.Z_0;
                    /**  Kennzahl fuer die Einkommensteuer-Tabellenart:
                         1 = Grundtabelle
                         2 = Splittingtabelle  */
                    this.KZTAB = 0;
                    /**  Jahreslohnsteuer in EURO  */
                    this.LSTJAHR = this.Z_0;
                    /**  Zwischenfelder der Jahreslohnsteuer in Cent  */
                    this.LST1 = this.Z_0;
                    this.LST2 = this.Z_0;
                    this.LST3 = this.Z_0;
                    this.LSTOSO = this.Z_0;
                    this.LSTSO = this.Z_0;
                    /**  Mindeststeuer fuer die Steuerklassen V und VI in EURO  */
                    this.MIST = this.Z_0;
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
                    /**  Bemessungsgrundlage fÃ¼r den Versorgungsfreibetrag in Cent fÃ¼r
                         den sonstigen Bezug  */
                    this.VBEZBSO = this.Z_0;
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
                    /**  Hoechstbetrag der Vorsorgepauschale nach Â§ 10c Abs. 3 EStG in EURO  */
                    this.VSPKURZ = this.Z_0;
                    /**  Hoechstbetrag der Vorsorgepauschale nach Â§ 10c Abs. 2 Nr. 2 EStG in EURO  */
                    this.VSPMAX1 = this.Z_0;
                    /**  Hoechstbetrag der Vorsorgepauschale nach Â§ 10c Abs. 2 Nr. 3 EStG in EURO  */
                    this.VSPMAX2 = this.Z_0;
                    /**  Vorsorgepauschale nach Â§ 10c Abs. 2 Satz 2 EStG vor der Hoechstbetragsberechnung
                         in EURO, C (2 Dezimalstellen)  */
                    this.VSPO = this.Z_0;
                    /**  Fuer den Abzug nach Â§ 10c Abs. 2 Nrn. 2 und 3 EStG verbleibender
                         Rest von VSPO in EURO, C (2 Dezimalstellen)  */
                    this.VSPREST = this.Z_0;
                    /**  Hoechstbetrag der Vorsorgepauschale nach Â§ 10c Abs. 2 Nr. 1 EStG
                         in EURO, C (2 Dezimalstellen)  */
                    this.VSPVOR = this.Z_0;
                    /**  Zu versteuerndes Einkommen gem. Â§ 32a Abs. 1 und 2 EStG â‚¬, C
                         (2 Dezimalstellen)  */
                    this.X = this.Z_0;
                    /**  gem. Â§ 32a Abs. 1 EStG (6 Dezimalstellen)  */
                    this.Y = this.Z_0;
                    /**  Auf einen Jahreslohn hochgerechnetes RE4 in â‚¬, C (2 Dezimalstellen)
                         nach Abzug der FreibetrÃ¤ge nach Â§ 39 b Abs. 2 Satz 3 und 4.  */
                    this.ZRE4 = this.Z_0;
                    /**  Auf einen Jahreslohn hochgerechnetes RE4 in â‚¬, C (2 Dezimalstellen)  */
                    this.ZRE4J = this.Z_0;
                    /**  Sicherungsfeld von ZRE4 bei der Berechnung der Lohnsteuer fÃ¼r
                         die VergÃ¼tung fÃ¼r mehrjÃ¤hrige TÃ¤tigkeit in â‚¬, C (2 Dezimalstellen)  */
                    this.ZRE4OSO = this.Z_0;
                    /**  1/5 des mehrjÃ¤hriger Bezugs abzÃ¼glich der auf diesen Lohnbestandteil
                         entfallenden festen TabellenfreibetrÃ¤ge in â‚¬, C (2 Dezimalstellen)  */
                    this.ZRE4VMT = this.Z_0;
                    /**  Auf einen Jahreslohn hochgerechnetes RE4 in â‚¬, C (2 Dezimalstellen)
                         nach Abzug des Versorgungsfreibetrags und des Alterentlastungsbetrags
                         zur Berechnung der Vorsorgepauschale in â‚¬, Cent (2 Dezimalstellen)  */
                    this.ZRE4VP = this.Z_0;
                    /**  Feste TabellenfreibetrÃ¤ge (ohne Vorsorgepauschale) in â‚¬, Cent
                         (2 Dezimalstellen)  */
                    this.ZTABFB = this.Z_0;
                    /**  Sicherungsfeld von ZTABFB bei der Berechnung fÃ¼r die VergÃ¼tung
                         fÃ¼r mehrjÃ¤hrige TÃ¤tigkeit in â‚¬, Cent (2 Dezimalstellen)  */
                    this.ZTABFBOSO = this.Z_0;
                    /**  Auf einen Jahreslohn hochgerechnetes (VBEZ abzueglich FVB) in
                         EURO, C (2 Dezimalstellen)  */
                    this.ZVBEZ = this.Z_0;
                    /**  Auf einen Jahreslohn hochgerechnetes VBEZ in â‚¬, C (2 Dezimalstellen)  */
                    this.ZVBEZJ = this.Z_0;
                    /**  Zu versteuerndes Einkommen in â‚¬, C (2 Dezimalstellen)  */
                    this.ZVE = this.Z_0;
                    /**  Zwischenfelder zu X fuer die Berechnung der Steuer nach Â§ 39b
                         Abs. 2 Satz 8 EStG in EURO.  */
                    this.ZX = this.Z_0;
                    this.ZZX = this.Z_0;
                    this.HOCH = this.Z_0;
                    this.VERGL = this.Z_0;
                    /**  Tabelle fuer die Vomhundertsaetze des Versorgungsfreibetrags  */
                    this.TAB1 = [new big_js_1.default(0.0), new big_js_1.default(0.4), new big_js_1.default(0.384), new big_js_1.default(0.368), new big_js_1.default(0.352), new big_js_1.default(0.336), new big_js_1.default(0.32), new big_js_1.default(0.304), new big_js_1.default(0.288), new big_js_1.default(0.272), new big_js_1.default(0.256), new big_js_1.default(0.24), new big_js_1.default(0.224), new big_js_1.default(0.208), new big_js_1.default(0.192), new big_js_1.default(0.176), new big_js_1.default(0.16), new big_js_1.default(0.152), new big_js_1.default(0.144), new big_js_1.default(0.136), new big_js_1.default(0.128), new big_js_1.default(0.12), new big_js_1.default(0.112), new big_js_1.default(0.104), new big_js_1.default(0.096), new big_js_1.default(0.088), new big_js_1.default(0.08), new big_js_1.default(0.072), new big_js_1.default(0.064), new big_js_1.default(0.056), new big_js_1.default(0.048), new big_js_1.default(0.04), new big_js_1.default(0.032), new big_js_1.default(0.024), new big_js_1.default(0.016), new big_js_1.default(0.008), new big_js_1.default(0.0)];
                    /**  Tabelle fuer die Hoechstbetrage des Versorgungsfreibetrags  */
                    this.TAB2 = [new big_js_1.default(0), new big_js_1.default(3000), new big_js_1.default(2880), new big_js_1.default(2760), new big_js_1.default(2640), new big_js_1.default(2520), new big_js_1.default(2400), new big_js_1.default(2280), new big_js_1.default(2160), new big_js_1.default(2040), new big_js_1.default(1920), new big_js_1.default(1800), new big_js_1.default(1680), new big_js_1.default(1560), new big_js_1.default(1440), new big_js_1.default(1320), new big_js_1.default(1200), new big_js_1.default(1140), new big_js_1.default(1080), new big_js_1.default(1020), new big_js_1.default(960), new big_js_1.default(900), new big_js_1.default(840), new big_js_1.default(780), new big_js_1.default(720), new big_js_1.default(660), new big_js_1.default(600), new big_js_1.default(540), new big_js_1.default(480), new big_js_1.default(420), new big_js_1.default(360), new big_js_1.default(300), new big_js_1.default(240), new big_js_1.default(180), new big_js_1.default(120), new big_js_1.default(60), new big_js_1.default(0)];
                    /**  Tabelle fuer die Zuschlaege zum Versorgungsfreibetrag  */
                    this.TAB3 = [new big_js_1.default(0), new big_js_1.default(900), new big_js_1.default(864), new big_js_1.default(828), new big_js_1.default(792), new big_js_1.default(756), new big_js_1.default(720), new big_js_1.default(684), new big_js_1.default(648), new big_js_1.default(612), new big_js_1.default(576), new big_js_1.default(540), new big_js_1.default(504), new big_js_1.default(468), new big_js_1.default(432), new big_js_1.default(396), new big_js_1.default(360), new big_js_1.default(342), new big_js_1.default(324), new big_js_1.default(306), new big_js_1.default(288), new big_js_1.default(270), new big_js_1.default(252), new big_js_1.default(234), new big_js_1.default(216), new big_js_1.default(198), new big_js_1.default(180), new big_js_1.default(162), new big_js_1.default(144), new big_js_1.default(126), new big_js_1.default(108), new big_js_1.default(90), new big_js_1.default(72), new big_js_1.default(54), new big_js_1.default(36), new big_js_1.default(18), new big_js_1.default(0)];
                    /**  Tabelle fuer die Vomhundertsaetze des Altersentlastungsbetrags  */
                    this.TAB4 = [new big_js_1.default(0.0), new big_js_1.default(0.4), new big_js_1.default(0.384), new big_js_1.default(0.368), new big_js_1.default(0.352), new big_js_1.default(0.336), new big_js_1.default(0.32), new big_js_1.default(0.304), new big_js_1.default(0.288), new big_js_1.default(0.272), new big_js_1.default(0.256), new big_js_1.default(0.24), new big_js_1.default(0.224), new big_js_1.default(0.208), new big_js_1.default(0.192), new big_js_1.default(0.176), new big_js_1.default(0.16), new big_js_1.default(0.152), new big_js_1.default(0.144), new big_js_1.default(0.136), new big_js_1.default(0.128), new big_js_1.default(0.12), new big_js_1.default(0.112), new big_js_1.default(0.104), new big_js_1.default(0.096), new big_js_1.default(0.088), new big_js_1.default(0.08), new big_js_1.default(0.072), new big_js_1.default(0.064), new big_js_1.default(0.056), new big_js_1.default(0.048), new big_js_1.default(0.04), new big_js_1.default(0.032), new big_js_1.default(0.024), new big_js_1.default(0.016), new big_js_1.default(0.008), new big_js_1.default(0.0)];
                    /**  Tabelle fuer die Hoechstbetraege des Altersentlastungsbetrags  */
                    this.TAB5 = [new big_js_1.default(0), new big_js_1.default(1900), new big_js_1.default(1824), new big_js_1.default(1748), new big_js_1.default(1672), new big_js_1.default(1596), new big_js_1.default(1520), new big_js_1.default(1444), new big_js_1.default(1368), new big_js_1.default(1292), new big_js_1.default(1216), new big_js_1.default(1140), new big_js_1.default(1064), new big_js_1.default(988), new big_js_1.default(912), new big_js_1.default(836), new big_js_1.default(760), new big_js_1.default(722), new big_js_1.default(684), new big_js_1.default(646), new big_js_1.default(608), new big_js_1.default(570), new big_js_1.default(532), new big_js_1.default(494), new big_js_1.default(456), new big_js_1.default(418), new big_js_1.default(380), new big_js_1.default(342), new big_js_1.default(304), new big_js_1.default(266), new big_js_1.default(228), new big_js_1.default(190), new big_js_1.default(152), new big_js_1.default(114), new big_js_1.default(76), new big_js_1.default(38), new big_js_1.default(0)];
                    /**  Zahlenkonstanten fuer im Plan oft genutzte BigDecimal Werte  */
                    this.ZAHL1 = this.Z_1;
                    this.ZAHL2 = new big_js_1.default(2);
                    this.ZAHL3 = new big_js_1.default(3);
                    this.ZAHL4 = new big_js_1.default(4);
                    this.ZAHL5 = new big_js_1.default(5);
                    this.ZAHL6 = new big_js_1.default(6);
                    this.ZAHL7 = new big_js_1.default(7);
                    this.ZAHL8 = new big_js_1.default(8);
                    this.ZAHL9 = new big_js_1.default(9);
                    this.ZAHL10 = this.Z_10;
                    this.ZAHL11 = new big_js_1.default(11);
                    this.ZAHL12 = new big_js_1.default(12);
                    this.ZAHL100 = new big_js_1.default(100);
                    this.ZAHL360 = new big_js_1.default(360);
                    this.ZAHL700 = new big_js_1.default(700);
                }
                /**  PROGRAMMABLAUFPLAN 2008, PAP Seite 10  */
                Lohnsteuer2008Big.prototype.calculate = function () {
                    this.MRE4JL();
                    this.MRE4();
                    this.MRE4ABZ();
                    this.MZTABFB();
                    this.KENNVMT = 0;
                    this.MLSTJAHR();
                    this.LSTJAHR = this.ST;
                    this.JW = this.LSTJAHR.mul(this.ZAHL100);
                    this.UPANTEIL();
                    this.LSTLZZ = this.ANTEIL1;
                    if (this.ZKF.cmp(this.Z_0) == 1) {
                        this.ZTABFB = (this.ZTABFB.add(this.KFB)).round(2, 0 /* RoundDown */);
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
                /**  Ermittlung des Jahresarbeitslohns und der FreibetrÃ¤ge Â§ 39 b Abs. 2 Satz 2 EStG, PAP Seite 11  */
                Lohnsteuer2008Big.prototype.MRE4JL = function () {
                    if (this.LZZ == 1) {
                        this.ZRE4J = this.RE4.div(this.ZAHL100).round(2, 0 /* RoundDown */);
                        this.ZVBEZJ = this.VBEZ.div(this.ZAHL100).round(2, 0 /* RoundDown */);
                        this.JLFREIB = this.LZZFREIB.div(this.ZAHL100).round(2, 0 /* RoundDown */);
                        this.JLHINZU = this.LZZHINZU.div(this.ZAHL100).round(2, 0 /* RoundDown */);
                    }
                    else {
                        if (this.LZZ == 2) {
                            this.ZRE4J = (this.RE4.mul(this.ZAHL12)).div(this.ZAHL100).round(2, 0 /* RoundDown */);
                            this.ZVBEZJ = (this.VBEZ.mul(this.ZAHL12)).div(this.ZAHL100).round(2, 0 /* RoundDown */);
                            this.JLFREIB = (this.LZZFREIB.mul(this.ZAHL12)).div(this.ZAHL100).round(2, 0 /* RoundDown */);
                            this.JLHINZU = (this.LZZHINZU.mul(this.ZAHL12)).div(this.ZAHL100).round(2, 0 /* RoundDown */);
                        }
                        else {
                            if (this.LZZ == 3) {
                                this.ZRE4J = (this.RE4.mul(this.ZAHL360)).div(this.ZAHL700).round(2, 0 /* RoundDown */);
                                this.ZVBEZJ = (this.VBEZ.mul(this.ZAHL360)).div(this.ZAHL700).round(2, 0 /* RoundDown */);
                                this.JLFREIB = (this.LZZFREIB.mul(this.ZAHL360)).div(this.ZAHL700).round(2, 0 /* RoundDown */);
                                this.JLHINZU = (this.LZZHINZU.mul(this.ZAHL360)).div(this.ZAHL700).round(2, 0 /* RoundDown */);
                            }
                            else {
                                this.ZRE4J = (this.RE4.mul(this.ZAHL360)).div(this.ZAHL100).round(2, 0 /* RoundDown */);
                                this.ZVBEZJ = (this.VBEZ.mul(this.ZAHL360)).div(this.ZAHL100).round(2, 0 /* RoundDown */);
                                this.JLFREIB = (this.LZZFREIB.mul(this.ZAHL360)).div(this.ZAHL100).round(2, 0 /* RoundDown */);
                                this.JLHINZU = (this.LZZHINZU.mul(this.ZAHL360)).div(this.ZAHL100).round(2, 0 /* RoundDown */);
                            }
                        }
                    }
                };
                /**  FreibetrÃ¤ge fÃ¼r VersorgungsbezÃ¼ge, Altersentlastungsbetrag (Â§ 39b Abs. 2 Satz 3 EStG), PAP Seite 12  */
                Lohnsteuer2008Big.prototype.MRE4 = function () {
                    if (this.ZVBEZJ.cmp(this.Z_0) == 0) {
                        this.FVBZ = this.Z_0;
                        this.FVB = this.Z_0;
                        this.FVBZSO = this.Z_0;
                        this.FVBSO = this.Z_0;
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
                            this.VBEZB = (this.VBEZM.mul(new big_js_1.default(this.ZMVB))).add(this.VBEZS);
                            /**  Achtung! Rechengenauigkeit Division?  */
                            this.HFVB = this.TAB2[this.J].div(this.ZAHL12).mul(new big_js_1.default(this.ZMVB));
                            this.FVBZ = this.TAB3[this.J].div(this.ZAHL12).mul(new big_js_1.default(this.ZMVB)).round(0, 3 /* RoundUp */);
                        }
                        else {
                            this.VBEZB = ((this.VBEZM.mul(this.ZAHL12)).add(this.VBEZS)).round(2, 0 /* RoundDown */);
                            this.HFVB = this.TAB2[this.J];
                            this.FVBZ = this.TAB3[this.J];
                        }
                        this.FVB = ((this.VBEZB.mul(this.TAB1[this.J]))).div(this.ZAHL100).round(2, 3 /* RoundUp */);
                        if (this.FVB.cmp(this.HFVB) == 1) {
                            this.FVB = this.HFVB;
                        }
                        this.VBEZBSO = this.STERBE.add(this.VKAPA);
                        this.FVBSO = (this.FVB.add((this.VBEZBSO.mul(this.TAB1[this.J])).div(this.ZAHL100))).round(2, 3 /* RoundUp */);
                        if (this.FVBSO.cmp(this.TAB2[this.J]) == 1) {
                            this.FVBSO = this.TAB2[this.J];
                        }
                        this.HFVBZSO = (((this.VBEZB.add(this.VBEZBSO)).div(this.ZAHL100)).sub(this.FVBSO)).round(2, 0 /* RoundDown */);
                        if ((this.TAB3[3]).cmp(this.HFVBZSO) == 1) {
                            this.FVBZSO = this.HFVBZSO.round(0, 3 /* RoundUp */);
                        }
                        else {
                            this.FVBZSO = this.TAB3[this.J];
                        }
                        this.HFVBZ = ((this.VBEZB.div(this.ZAHL100)).sub(this.FVB)).round(2, 0 /* RoundDown */);
                        if (this.FVBZ.cmp(this.HFVBZ) == 1) {
                            this.FVBZ = this.HFVBZ.round(0, 3 /* RoundUp */);
                        }
                    }
                    this.MRE4ALTE();
                };
                /**  Altersentlastungsbetrag (Â§ 39b Abs. 2 Satz 3 EStG), PAP Seite 13  */
                Lohnsteuer2008Big.prototype.MRE4ALTE = function () {
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
                        this.BMG = this.ZRE4J.sub(this.ZVBEZJ);
                        this.ALTE = (this.BMG.mul(this.TAB4[this.K])).round(2, 3 /* RoundUp */);
                        this.HBALTE = this.TAB5[this.K];
                        if (this.ALTE.cmp(this.HBALTE) == 1) {
                            this.ALTE = this.HBALTE;
                        }
                    }
                };
                /**  Ermittlung des Jahresarbeitslohns nach Abzug der FreibetrÃ¤ge nach Â§ 39 b Abs. 2 Satz 3 und 4 EStG, PAP Seite 15  */
                Lohnsteuer2008Big.prototype.MRE4ABZ = function () {
                    this.ZRE4 = (this.ZRE4J.sub(this.FVB).sub(this.ALTE).sub(this.JLFREIB).add(this.JLHINZU)).round(2, 0 /* RoundDown */);
                    if (this.ZRE4.cmp(this.Z_0) == -1) {
                        this.ZRE4 = this.Z_0;
                    }
                    this.ZRE4VP = (this.ZRE4J.sub(this.FVB).sub(this.ALTE)).round(2, 0 /* RoundDown */);
                    if (this.ZRE4VP.cmp(this.Z_0) == -1) {
                        this.ZRE4VP = this.Z_0;
                    }
                    this.ZVBEZ = (this.ZVBEZJ.sub(this.FVB)).round(2, 0 /* RoundDown */);
                    if (this.ZVBEZ.cmp(this.Z_0) == -1) {
                        this.ZVBEZ = this.Z_0;
                    }
                };
                /**  Ermittlung der festen TabellenfreibetrÃ¤ge (ohne Vorsorgepauschale), PAP Seite 16  */
                Lohnsteuer2008Big.prototype.MZTABFB = function () {
                    this.ANP = this.Z_0;
                    if (this.ZVBEZ.cmp(this.Z_0) >= 0) {
                        if (this.ZVBEZ.cmp(this.FVBZ) == -1) {
                            this.FVBZ = this.ZVBEZ.round(0, 0 /* RoundDown */);
                        }
                    }
                    if (this.STKL < 6) {
                        if (this.ZVBEZ.cmp(this.Z_0) == 1) {
                            if ((this.ZVBEZ.sub(this.FVBZ)).cmp(new big_js_1.default(102)) == -1) {
                                this.ANP = (this.ZVBEZ.sub(this.FVBZ)).round(0, 0 /* RoundDown */);
                            }
                            else {
                                this.ANP = new big_js_1.default(102);
                            }
                        }
                    }
                    else {
                        this.FVBZ = new big_js_1.default(0);
                        this.FVBZSO = new big_js_1.default(0);
                    }
                    if (this.STKL < 6) {
                        if (this.ZRE4.cmp(this.ZVBEZ) == 1) {
                            if ((this.ZRE4.sub(this.ZVBEZ)).cmp(new big_js_1.default(920)) == -1) {
                                this.ANP = (this.ANP.add(this.ZRE4).sub(this.ZVBEZ)).round(0, 0 /* RoundDown */);
                            }
                            else {
                                this.ANP = this.ANP.add(new big_js_1.default(920));
                            }
                        }
                    }
                    this.KZTAB = 1;
                    if (this.STKL == 1) {
                        this.SAP = new big_js_1.default(36);
                        this.KFB = (this.ZKF.mul(new big_js_1.default(5808))).round(0, 0 /* RoundDown */);
                    }
                    else {
                        if (this.STKL == 2) {
                            this.EFA = new big_js_1.default(1308);
                            this.SAP = new big_js_1.default(36);
                            this.KFB = (this.ZKF.mul(new big_js_1.default(5808))).round(0, 0 /* RoundDown */);
                        }
                        else {
                            if (this.STKL == 3) {
                                this.KZTAB = 2;
                                this.SAP = new big_js_1.default(72);
                                this.KFB = (this.ZKF.mul(new big_js_1.default(5808))).round(0, 0 /* RoundDown */);
                            }
                            else {
                                if (this.STKL == 4) {
                                    this.SAP = new big_js_1.default(36);
                                    this.KFB = (this.ZKF.mul(new big_js_1.default(2904))).round(0, 0 /* RoundDown */);
                                }
                                else {
                                    this.KFB = this.Z_0;
                                }
                            }
                        }
                    }
                    this.ZTABFB = (this.EFA.add(this.ANP).add(this.SAP).add(this.FVBZ)).round(2, 0 /* RoundDown */);
                };
                /**  Ermittlung Jahreslohnsteuer, PAP Seite 17  */
                Lohnsteuer2008Big.prototype.MLSTJAHR = function () {
                    if (this.STKL < 5) {
                        this.UPEVP();
                    }
                    else {
                        this.VSP = this.Z_0;
                    }
                    if (this.KENNVMT == 0) {
                        this.ZVE = (this.ZRE4.sub(this.ZTABFB).sub(this.VSP)).round(2, 0 /* RoundDown */);
                    }
                    else {
                        if (this.KENNVMT == 1) {
                            this.ZVE = this.ZRE4OSO.sub(this.ZTABFBOSO).add(this.ZRE4VMT).sub(this.VSP).round(2, 0 /* RoundDown */);
                        }
                        else {
                            this.ZVE = (((this.ZRE4.sub(this.ZTABFB)).div(this.ZAHL5)).sub(this.VSP)).round(2, 0 /* RoundDown */);
                        }
                    }
                    if (this.ZVE.cmp(this.ZAHL1) == -1) {
                        this.ZVE = this.Z_0;
                        this.X = this.Z_0;
                    }
                    else {
                        this.X = this.ZVE.div(new big_js_1.default(this.KZTAB)).round(0, 0 /* RoundDown */);
                    }
                    if (this.STKL < 5) {
                        this.UPTAB07();
                    }
                    else {
                        this.MST5_6();
                    }
                };
                /**  Vorsorgepauschale (Â§ 39b Abs. 2 Satz 6 Nr 3 EStG) nach AlterseinkÃ¼nftegesetz, PAP Seite 18  */
                Lohnsteuer2008Big.prototype.UPEVP = function () {
                    /**  Achtung: Er wird davon ausgegangen, dass
                      a) die Rentenversicherungsbemessungsgrenze sich 2008 auf 63.600 erhÃ¶ht und
                      b) der Beitragsatz zur Rentenversicherung gegenÃ¼ber 2007 unverÃ¤ndert bleibt  */
                    if (this.KRV > 0) {
                        this.VSP1 = this.Z_0;
                    }
                    else {
                        if (this.ZRE4VP.cmp(new big_js_1.default(63600)) == 1) {
                            this.ZRE4VP = new big_js_1.default(63600);
                        }
                        this.VSP1 = (this.ZRE4VP.mul(new big_js_1.default(0.32))).round(2, 0 /* RoundDown */);
                        this.VSP1 = (this.VSP1.mul(new big_js_1.default(0.0995))).round(2, 0 /* RoundDown */);
                    }
                    this.VSP2 = (this.ZRE4VP.mul(new big_js_1.default(0.11))).round(2, 0 /* RoundDown */);
                    this.VHB = (new big_js_1.default(this.KZTAB).mul(new big_js_1.default(1500))).round(2, 0 /* RoundDown */);
                    if (this.VSP2.cmp(this.VHB) == 1) {
                        this.VSP2 = this.VHB;
                    }
                    this.VSPN = (this.VSP1.add(this.VSP2)).round(0, 3 /* RoundUp */);
                    this.MVSP();
                    if (this.VSPN.cmp(this.VSP) == 1) {
                        this.VSP = this.VSPN.round(2, 0 /* RoundDown */);
                    }
                };
                /**  Vorsorgepauschale (Â§39b Abs. 2 Satz 6 Nr 3 EStG) Vergleichsberechnung fuer Guenstigerpruefung, PAP Seite 19  */
                Lohnsteuer2008Big.prototype.MVSP = function () {
                    this.VSPO = (this.ZRE4VP.mul(new big_js_1.default(0.2))).round(2, 0 /* RoundDown */);
                    this.VSPVOR = (new big_js_1.default(this.KZTAB).mul(new big_js_1.default(3068))).round(2, 0 /* RoundDown */);
                    this.VSPMAX1 = new big_js_1.default(this.KZTAB).mul(new big_js_1.default(1334));
                    this.VSPMAX2 = new big_js_1.default(this.KZTAB).mul(new big_js_1.default(667));
                    this.VSPKURZ = new big_js_1.default(this.KZTAB).mul(new big_js_1.default(1134));
                    if (this.KRV == 1) {
                        if (this.VSPO.cmp(this.VSPKURZ) == 1) {
                            this.VSP = this.VSPKURZ;
                        }
                        else {
                            this.VSP = this.VSPO.round(0, 0 /* RoundDown */);
                        }
                    }
                    else {
                        this.UMVSP();
                    }
                };
                /**  Vorsorgepauschale, PAP Seite 20  */
                Lohnsteuer2008Big.prototype.UMVSP = function () {
                    this.VSPVOR = (this.VSPVOR.sub(this.ZRE4VP.mul(new big_js_1.default(0.16)))).round(2, 0 /* RoundDown */);
                    if (this.VSPVOR.cmp(this.Z_0) == -1) {
                        this.VSPVOR = this.Z_0;
                    }
                    if (this.VSPO.cmp(this.VSPVOR) == 1) {
                        this.VSP = this.VSPVOR;
                        this.VSPREST = this.VSPO.sub(this.VSPVOR);
                        if (this.VSPREST.cmp(this.VSPMAX1) == 1) {
                            this.VSP = this.VSP.add(this.VSPMAX1);
                            this.VSPREST = (this.VSPREST.sub(this.VSPMAX1)).div(this.ZAHL2).round(2, 3 /* RoundUp */);
                            if (this.VSPREST.cmp(this.VSPMAX2) == 1) {
                                this.VSP = (this.VSP.add(this.VSPMAX2)).round(0, 0 /* RoundDown */);
                            }
                            else {
                                this.VSP = (this.VSP.add(this.VSPREST)).round(0, 0 /* RoundDown */);
                            }
                        }
                        else {
                            this.VSP = (this.VSP.add(this.VSPREST)).round(0, 0 /* RoundDown */);
                        }
                    }
                    else {
                        this.VSP = this.VSPO.round(0, 0 /* RoundDown */);
                    }
                };
                /**  Lohnsteuer fuer die Steuerklassen V und VI (Â§ 39b Abs. 2 Satz 8 EStG), PAP Seite 21  */
                Lohnsteuer2008Big.prototype.MST5_6 = function () {
                    this.ZZX = this.X;
                    if (this.ZZX.cmp(new big_js_1.default(25812)) == 1) {
                        this.ZX = new big_js_1.default(25812);
                        this.UP5_6();
                        if (this.ZZX.cmp(new big_js_1.default(200000)) == 1) {
                            this.ST = (this.ST.add(new big_js_1.default(73158.96))).round(0, 0 /* RoundDown */);
                            ;
                            this.ST = (this.ST.add((this.ZZX.sub(new big_js_1.default(200000))).mul(new big_js_1.default(0.45)))).round(0, 0 /* RoundDown */);
                        }
                        else {
                            this.ST = (this.ST.add((this.ZZX.sub(new big_js_1.default(25812))).mul(new big_js_1.default(0.42)))).round(0, 0 /* RoundDown */);
                        }
                    }
                    else {
                        this.ZX = this.ZZX;
                        this.UP5_6();
                        if (this.ZZX.cmp(new big_js_1.default(9144)) == 1) {
                            this.VERGL = this.ST;
                            this.ZX = new big_js_1.default(9144);
                            this.UP5_6();
                            this.HOCH = (this.ST.add((this.ZZX.sub(new big_js_1.default(9144))).mul(new big_js_1.default(0.42)))).round(0, 0 /* RoundDown */);
                            if (this.HOCH.cmp(this.VERGL) == -1) {
                                this.ST = this.HOCH;
                            }
                            else {
                                this.ST = this.VERGL;
                            }
                        }
                    }
                };
                /**  Lohnsteuer fuer die Steuerklassen V und VI (Â§ 39b Abs. 2 Satz 8 EStG), PAP Seite 21  */
                Lohnsteuer2008Big.prototype.UP5_6 = function () {
                    this.X = (this.ZX.mul(new big_js_1.default(1.25))).round(2, 0 /* RoundDown */);
                    this.UPTAB07();
                    this.ST1 = this.ST;
                    this.X = (this.ZX.mul(new big_js_1.default(0.75))).round(2, 0 /* RoundDown */);
                    this.UPTAB07();
                    this.ST2 = this.ST;
                    this.DIFF = (this.ST1.sub(this.ST2)).mul(this.ZAHL2);
                    this.MIST = (this.ZX.mul(new big_js_1.default(0.15))).round(0, 0 /* RoundDown */);
                    if (this.MIST.cmp(this.DIFF) == 1) {
                        this.ST = this.MIST;
                    }
                    else {
                        this.ST = this.DIFF;
                    }
                };
                /**  Solidaritaetszuschlag, PAP Seite 22  */
                Lohnsteuer2008Big.prototype.MSOLZ = function () {
                    this.SOLZFREI = new big_js_1.default(972 * this.KZTAB);
                    if (this.JBMG.cmp(this.SOLZFREI) == 1) {
                        this.SOLZJ = (this.JBMG.mul(new big_js_1.default(5.5))).div(this.ZAHL100).round(2, 0 /* RoundDown */);
                        this.SOLZMIN = (this.JBMG.sub(this.SOLZFREI)).mul(new big_js_1.default(20)).div(this.ZAHL100).round(2, 0 /* RoundDown */);
                        if (this.SOLZMIN.cmp(this.SOLZJ) == -1) {
                            this.SOLZJ = this.SOLZMIN;
                        }
                        this.JW = this.SOLZJ.mul(this.ZAHL100).round(0, 0 /* RoundDown */);
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
                /**  Anteil von Jahresbetraegen fuer einen LZZ (Â§ 39b Abs. 2 Satz 10 EStG), PAP Seite 23  */
                Lohnsteuer2008Big.prototype.UPANTEIL = function () {
                    if (this.LZZ == 1) {
                        this.ANTEIL1 = this.JW;
                        this.ANTEIL2 = this.JW;
                    }
                    else {
                        if (this.LZZ == 2) {
                            this.ANTEIL1 = this.JW.div(this.ZAHL12).round(0, 0 /* RoundDown */);
                            this.ANTEIL2 = this.JW.div(this.ZAHL12).round(0, 3 /* RoundUp */);
                        }
                        else {
                            if (this.LZZ == 3) {
                                this.ANTEIL1 = (this.JW.mul(this.ZAHL7)).div(this.ZAHL360).round(0, 0 /* RoundDown */);
                                this.ANTEIL2 = (this.JW.mul(this.ZAHL7)).div(this.ZAHL360).round(0, 3 /* RoundUp */);
                            }
                            else {
                                this.ANTEIL1 = this.JW.div(this.ZAHL360).round(0, 0 /* RoundDown */);
                                this.ANTEIL2 = this.JW.div(this.ZAHL360).round(0, 3 /* RoundUp */);
                            }
                        }
                    }
                };
                /**  Berechnung sonstiger Bezuege nach Â§ 39b Abs. 3 Saetze 1 bis 7 EStG), PAP Seite 24  */
                Lohnsteuer2008Big.prototype.MSONST = function () {
                    this.LZZ = 1;
                    if (this.ZMVB == 0) {
                        this.ZMVB = 12;
                    }
                    if (this.SONSTB.cmp(this.Z_0) == 0) {
                        this.LSTSO = this.Z_0;
                        this.STS = this.Z_0;
                        this.SOLZS = this.Z_0;
                        this.BKS = this.Z_0;
                    }
                    else {
                        this.MOSONST();
                        this.ZRE4J = ((this.JRE4.add(this.SONSTB)).div(this.ZAHL100)).round(2, 0 /* RoundDown */);
                        this.ZVBEZJ = ((this.JVBEZ.add(this.VBS)).div(this.ZAHL100)).round(2, 0 /* RoundDown */);
                        this.MRE4SONST();
                        this.MLSTJAHR();
                        this.LSTSO = this.ST.mul(this.ZAHL100);
                        this.STS = this.LSTSO.sub(this.LSTOSO);
                        if (this.STS.cmp(this.Z_0) == -1) {
                            this.STS = this.Z_0;
                        }
                        this.SOLZS = this.STS.mul(new big_js_1.default(5.5)).div(this.ZAHL100).round(0, 0 /* RoundDown */);
                        if (this.R > 0) {
                            this.BKS = this.STS;
                        }
                        else {
                            this.BKS = this.Z_0;
                        }
                    }
                };
                /**  Berechnung der Verguetung fuer mehrjaehrige Taetigkeit nach Â§ 39b Abs. 3 Satz 9 EStG), PAP Seite 25  */
                Lohnsteuer2008Big.prototype.MVMT = function () {
                    if (this.VKAPA.cmp(this.Z_0) == -1) {
                        this.VKAPA = this.Z_0;
                    }
                    if ((this.VMT.add(this.VKAPA)).cmp(this.Z_0) == 1) {
                        if (this.LSTSO.cmp(this.Z_0) == 0) {
                            this.MOSONST();
                            this.LST1 = this.LSTOSO;
                        }
                        else {
                            this.LST1 = this.LSTSO;
                        }
                        this.ZRE4OSO = this.ZRE4;
                        this.ZTABFBOSO = this.ZTABFB;
                        this.FVBZOSO = this.FVBZ;
                        this.ZRE4J = ((this.JRE4.add(this.SONSTB).add(this.VMT).add(this.VKAPA)).div(this.ZAHL100)).round(2, 0 /* RoundDown */);
                        this.ZVBEZJ = ((this.JVBEZ.add(this.VBS).add(this.VKAPA)).div(this.ZAHL100)).round(2, 0 /* RoundDown */);
                        this.MRE4SONST();
                        this.MLSTJAHR();
                        this.LST3 = this.ST.mul(this.ZAHL100);
                        this.ZTABFB = (this.ZTABFB.sub(this.FVBZ).add(this.FVBZOSO)).round(2, 0 /* RoundDown */);
                        this.KENNVMT = 1;
                        if ((this.JRE4.add(this.SONSTB).sub(this.JFREIB).add(this.JHINZU)).cmp(this.Z_0) == -1) {
                            this.KENNVMT = 2;
                            this.MLSTJAHR();
                            this.LST2 = this.ST.mul(this.ZAHL100);
                            this.STV = this.LST2.mul(this.ZAHL5);
                        }
                        else {
                            this.ZRE4VMT = (((this.VMT.div(this.ZAHL100)).add(this.VKAPA.div(this.ZAHL100)).sub(this.ZTABFB).add(this.ZTABFBOSO)).div(this.ZAHL5)).round(2, 0 /* RoundDown */);
                            this.MLSTJAHR();
                            this.LST2 = this.ST.mul(this.ZAHL100);
                            this.STV = (this.LST2.sub(this.LST1)).mul(this.ZAHL5);
                        }
                        this.LST3 = this.LST3.sub(this.LST1);
                        if (this.LST3.cmp(this.STV) == -1) {
                            this.STV = this.LST3;
                        }
                        if (this.STV.cmp(this.Z_0) == -1) {
                            this.STV = this.Z_0;
                        }
                        this.SOLZV = (this.STV.mul(new big_js_1.default(5.5))).div(this.ZAHL100).round(0, 0 /* RoundDown */);
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
                /**  Sonderberechnung ohne sonstige BezÃ¼ge fÃ¼r Berechnung bei sonstigen BezÃ¼gen oder VergÃ¼tung fÃ¼r mehrjÃ¤hrige TÃ¤tigkeit, PAP Seite 26  */
                Lohnsteuer2008Big.prototype.MOSONST = function () {
                    this.ZRE4J = (this.JRE4.div(this.ZAHL100)).round(2, 0 /* RoundDown */);
                    this.ZVBEZJ = (this.JVBEZ.div(this.ZAHL100)).round(2, 0 /* RoundDown */);
                    this.JLFREIB = this.JFREIB.div(this.ZAHL100).round(2, 0 /* RoundDown */);
                    this.JLHINZU = this.JHINZU.div(this.ZAHL100).round(2, 0 /* RoundDown */);
                    this.MRE4();
                    this.MRE4ABZ();
                    this.MZTABFB();
                    this.MLSTJAHR();
                    this.LSTOSO = this.ST.mul(this.ZAHL100);
                };
                /**  Sonderberechnung mit sonstige BezÃ¼ge fÃ¼r Berechnung bei sonstigen BezÃ¼gen oder VergÃ¼tung fÃ¼r mehrjÃ¤hrige TÃ¤tigkeit, PAP Seite 26  */
                Lohnsteuer2008Big.prototype.MRE4SONST = function () {
                    this.MRE4();
                    this.FVB = this.FVBSO;
                    this.MRE4ABZ();
                    this.FVBZ = this.FVBZSO;
                    this.MZTABFB();
                };
                /**  Tarifliche Einkommensteuer Â§32a EStG, PAP Seite 27  */
                Lohnsteuer2008Big.prototype.UPTAB07 = function () {
                    if (this.X.cmp(new big_js_1.default(7665)) == -1) {
                        this.ST = this.Z_0;
                    }
                    else {
                        if (this.X.cmp(new big_js_1.default(12740)) == -1) {
                            this.Y = (this.X.sub(new big_js_1.default(7664))).div(new big_js_1.default(10000)).round(6, 0 /* RoundDown */);
                            this.RW = this.Y.mul(new big_js_1.default(883.74));
                            this.RW = this.RW.add(new big_js_1.default(1500));
                            this.ST = (this.RW.mul(this.Y)).round(0, 0 /* RoundDown */);
                        }
                        else {
                            if (this.X.cmp(new big_js_1.default(52152)) == -1) {
                                this.Y = (this.X.sub(new big_js_1.default(12739))).div(new big_js_1.default(10000)).round(6, 0 /* RoundDown */);
                                this.RW = this.Y.mul(new big_js_1.default(228.74));
                                this.RW = this.RW.add(new big_js_1.default(2397));
                                this.RW = this.RW.mul(this.Y);
                                this.ST = (this.RW.add(new big_js_1.default(989))).round(0, 0 /* RoundDown */);
                            }
                            else {
                                if (this.X.cmp(new big_js_1.default(250001)) == -1) {
                                    this.ST = ((this.X.mul(new big_js_1.default(0.42))).sub(new big_js_1.default(7914))).round(0, 0 /* RoundDown */);
                                }
                                else {
                                    this.ST = ((this.X.mul(new big_js_1.default(0.45))).sub(new big_js_1.default(15414))).round(0, 0 /* RoundDown */);
                                }
                            }
                        }
                    }
                    this.ST = this.ST.mul(new big_js_1.default(this.KZTAB));
                };
                /**
                 * Getter for AJAHR.
                 * <p>
                 *  Auf die Vollendung des 64. Lebensjahres folgende
                         Kalenderjahr (erforderlich, wenn ALTER1=1)
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getAJAHR = function () {
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
                Lohnsteuer2008Big.prototype.setAJAHR = function (AJAHR) {
                    this.AJAHR = AJAHR;
                };
                /**
                 * Getter for ALTER1.
                 * <p>
                 *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                         der Lohnzahlungszeitraum endet (Â§ 24 a EStG), sonst = 0
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getALTER1 = function () {
                    return this.ALTER1;
                };
                /**
                 * Setter for ALTER1.
                 * <p>
                 *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                         der Lohnzahlungszeitraum endet (Â§ 24 a EStG), sonst = 0
                 * <p>
                 * @param {number} ALTER1 input value
                 */
                Lohnsteuer2008Big.prototype.setALTER1 = function (ALTER1) {
                    this.ALTER1 = ALTER1;
                };
                /**
                 * Getter for JFREIB.
                 * <p>
                 *  Jahresfreibetrag nach Ma&szlig;gabe der Eintragungen auf der
                         Lohnsteuerkarte in Cents (ggf. 0)
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getJFREIB = function () {
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
                Lohnsteuer2008Big.prototype.setJFREIB = function (JFREIB) {
                    this.JFREIB = JFREIB;
                };
                /**
                 * Getter for JHINZU.
                 * <p>
                 *  Jahreshinzurechnungsbetrag in Cents (ggf. 0)
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getJHINZU = function () {
                    return this.JHINZU;
                };
                /**
                 * Setter for JHINZU.
                 * <p>
                 *  Jahreshinzurechnungsbetrag in Cents (ggf. 0)
                 * <p>
                 * @param {Big} JHINZU input value
                 */
                Lohnsteuer2008Big.prototype.setJHINZU = function (JHINZU) {
                    this.JHINZU = JHINZU;
                };
                /**
                 * Getter for JRE4.
                 * <p>
                 *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezuege und
                         ohne Verguetung fuer mehrjaehrige Taetigkeit in Cents (ggf. 0)
                         Anmerkung: Die Eingabe dieses Feldes ist erforderlich bei Eingabe
                         â€žsonstiger Bezuegeâ€œ (Feld SONSTB) oder bei Eingabe der â€žVerguetung
                         fuer mehrjaehrige Taetigkeitâ€œ (Feld VMT).
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getJRE4 = function () {
                    return this.JRE4;
                };
                /**
                 * Setter for JRE4.
                 * <p>
                 *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezuege und
                         ohne Verguetung fuer mehrjaehrige Taetigkeit in Cents (ggf. 0)
                         Anmerkung: Die Eingabe dieses Feldes ist erforderlich bei Eingabe
                         â€žsonstiger Bezuegeâ€œ (Feld SONSTB) oder bei Eingabe der â€žVerguetung
                         fuer mehrjaehrige Taetigkeitâ€œ (Feld VMT).
                 * <p>
                 * @param {Big} JRE4 input value
                 */
                Lohnsteuer2008Big.prototype.setJRE4 = function (JRE4) {
                    this.JRE4 = JRE4;
                };
                /**
                 * Getter for JVBEZ.
                 * <p>
                 *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getJVBEZ = function () {
                    return this.JVBEZ;
                };
                /**
                 * Setter for JVBEZ.
                 * <p>
                 *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
                 * <p>
                 * @param {Big} JVBEZ input value
                 */
                Lohnsteuer2008Big.prototype.setJVBEZ = function (JVBEZ) {
                    this.JVBEZ = JVBEZ;
                };
                /**
                 * Getter for KRV.
                 * <p>
                 *  2 = fÃ¼r den Arbeitnehmer wird die gekÃ¼rzte Vorsorgepauschale nach dem Recht 2008 angesetzt
                                     (Â§ 10c Abs. 3 EStG n.F.), jedoch bei der GÃ¼nstigerprÃ¼fung die ungekÃ¼rzte Vorsorgepauschale
                                     nach dem Recht bis 2004 berÃ¼cksichtigt (Â§ 10c Abs. 2 EStG a.F.); Ã„nderung durch das JStG 2008.
                                     1 = fÃ¼r den Arbeitnehmer wird die gekÃ¼rzte Vorsorgepauschale angewandt (Â§ 10c Abs. 3 EStG),
                                     soweit nicht Arbeitnehmer der Fallgruppe 2.
                                     0 = andere Arbeitnehmer.
                                     FÃ¼r die Zuordnung sind allein die dem Arbeitgeber ohnehin bekannten Tatsachen maÃŸgebend;
                                     zusÃ¤tzliche Ermittlungen braucht der Arbeitgeber nicht anzustellen.
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getKRV = function () {
                    return this.KRV;
                };
                /**
                 * Setter for KRV.
                 * <p>
                 *  2 = fÃ¼r den Arbeitnehmer wird die gekÃ¼rzte Vorsorgepauschale nach dem Recht 2008 angesetzt
                                     (Â§ 10c Abs. 3 EStG n.F.), jedoch bei der GÃ¼nstigerprÃ¼fung die ungekÃ¼rzte Vorsorgepauschale
                                     nach dem Recht bis 2004 berÃ¼cksichtigt (Â§ 10c Abs. 2 EStG a.F.); Ã„nderung durch das JStG 2008.
                                     1 = fÃ¼r den Arbeitnehmer wird die gekÃ¼rzte Vorsorgepauschale angewandt (Â§ 10c Abs. 3 EStG),
                                     soweit nicht Arbeitnehmer der Fallgruppe 2.
                                     0 = andere Arbeitnehmer.
                                     FÃ¼r die Zuordnung sind allein die dem Arbeitgeber ohnehin bekannten Tatsachen maÃŸgebend;
                                     zusÃ¤tzliche Ermittlungen braucht der Arbeitgeber nicht anzustellen.
                 * <p>
                 * @param {number} KRV input value
                 */
                Lohnsteuer2008Big.prototype.setKRV = function (KRV) {
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
                Lohnsteuer2008Big.prototype.getLZZ = function () {
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
                Lohnsteuer2008Big.prototype.setLZZ = function (LZZ) {
                    this.LZZ = LZZ;
                };
                /**
                 * Getter for LZZFREIB.
                 * <p>
                 *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag fÃ¼r
                         den Lohnzahlungszeitraum in Cent
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getLZZFREIB = function () {
                    return this.LZZFREIB;
                };
                /**
                 * Setter for LZZFREIB.
                 * <p>
                 *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag fÃ¼r
                         den Lohnzahlungszeitraum in Cent
                 * <p>
                 * @param {Big} LZZFREIB input value
                 */
                Lohnsteuer2008Big.prototype.setLZZFREIB = function (LZZFREIB) {
                    this.LZZFREIB = LZZFREIB;
                };
                /**
                 * Getter for LZZHINZU.
                 * <p>
                 *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
                         fÃ¼r den Lohnzahlungszeitraum in Cent
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getLZZHINZU = function () {
                    return this.LZZHINZU;
                };
                /**
                 * Setter for LZZHINZU.
                 * <p>
                 *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
                         fÃ¼r den Lohnzahlungszeitraum in Cent
                 * <p>
                 * @param {Big} LZZHINZU input value
                 */
                Lohnsteuer2008Big.prototype.setLZZHINZU = function (LZZHINZU) {
                    this.LZZHINZU = LZZHINZU;
                };
                /**
                 * Getter for R.
                 * <p>
                 *  Religionsgemeinschaft des Arbeitnehmers lt. Lohnsteuerkarte (bei
                         keiner Religionszugehoerigkeit = 0)
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getR = function () {
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
                Lohnsteuer2008Big.prototype.setR = function (R) {
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
                Lohnsteuer2008Big.prototype.getRE4 = function () {
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
                Lohnsteuer2008Big.prototype.setRE4 = function (RE4) {
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
                Lohnsteuer2008Big.prototype.getSONSTB = function () {
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
                Lohnsteuer2008Big.prototype.setSONSTB = function (SONSTB) {
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
                Lohnsteuer2008Big.prototype.getSTERBE = function () {
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
                Lohnsteuer2008Big.prototype.setSTERBE = function (STERBE) {
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
                Lohnsteuer2008Big.prototype.getSTKL = function () {
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
                Lohnsteuer2008Big.prototype.setSTKL = function (STKL) {
                    this.STKL = STKL;
                };
                /**
                 * Getter for VBEZ.
                 * <p>
                 *  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getVBEZ = function () {
                    return this.VBEZ;
                };
                /**
                 * Setter for VBEZ.
                 * <p>
                 *  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
                 * <p>
                 * @param {Big} VBEZ input value
                 */
                Lohnsteuer2008Big.prototype.setVBEZ = function (VBEZ) {
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
                Lohnsteuer2008Big.prototype.getVBEZM = function () {
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
                Lohnsteuer2008Big.prototype.setVBEZM = function (VBEZM) {
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
                Lohnsteuer2008Big.prototype.getVBEZS = function () {
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
                Lohnsteuer2008Big.prototype.setVBEZS = function (VBEZS) {
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
                Lohnsteuer2008Big.prototype.getVBS = function () {
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
                Lohnsteuer2008Big.prototype.setVBS = function (VBS) {
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
                Lohnsteuer2008Big.prototype.getVJAHR = function () {
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
                Lohnsteuer2008Big.prototype.setVJAHR = function (VJAHR) {
                    this.VJAHR = VJAHR;
                };
                /**
                 * Getter for VKAPA.
                 * <p>
                 *  Kapitalauszahlungen/Abfindungen bei Versorgungsbezuegen fuer mehrere Jahre in Cents (ggf. 0)
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getVKAPA = function () {
                    return this.VKAPA;
                };
                /**
                 * Setter for VKAPA.
                 * <p>
                 *  Kapitalauszahlungen/Abfindungen bei Versorgungsbezuegen fuer mehrere Jahre in Cents (ggf. 0)
                 * <p>
                 * @param {Big} VKAPA input value
                 */
                Lohnsteuer2008Big.prototype.setVKAPA = function (VKAPA) {
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
                Lohnsteuer2008Big.prototype.getVMT = function () {
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
                Lohnsteuer2008Big.prototype.setVMT = function (VMT) {
                    this.VMT = VMT;
                };
                /**
                 * Getter for ZKF.
                 * <p>
                 *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
                         I, II, III und IV)
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getZKF = function () {
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
                Lohnsteuer2008Big.prototype.setZKF = function (ZKF) {
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
                Lohnsteuer2008Big.prototype.getZMVB = function () {
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
                Lohnsteuer2008Big.prototype.setZMVB = function (ZMVB) {
                    this.ZMVB = ZMVB;
                };
                /**
                 * Getter for BK.
                 * <p>
                 *  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getBK = function () {
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
                Lohnsteuer2008Big.prototype.getBKS = function () {
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
                Lohnsteuer2008Big.prototype.getBKV = function () {
                    return this.BKV;
                };
                /**
                 * Getter for LSTLZZ.
                 * <p>
                 *  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getLSTLZZ = function () {
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
                Lohnsteuer2008Big.prototype.getSOLZLZZ = function () {
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
                Lohnsteuer2008Big.prototype.getSOLZS = function () {
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
                Lohnsteuer2008Big.prototype.getSOLZV = function () {
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
                Lohnsteuer2008Big.prototype.getSTS = function () {
                    return this.STS;
                };
                /**
                 * Getter for STV.
                 * <p>
                 *  Lohnsteuer fuer Verguetung fuer mehrjaehrige Taetigkeit in Cents
                 * <p>
                 * @return the value
                 */
                Lohnsteuer2008Big.prototype.getSTV = function () {
                    return this.STV;
                };
                /**
                 * Initialize all inputs values with zero.
                 */
                Lohnsteuer2008Big.prototype.initInputs = function () {
                    this.AJAHR = 0;
                    this.ALTER1 = 0;
                    this.JFREIB = this.Z_0;
                    this.JHINZU = this.Z_0;
                    this.JRE4 = this.Z_0;
                    this.JVBEZ = this.Z_0;
                    this.KRV = 0;
                    this.LZZ = 0;
                    this.LZZFREIB = this.Z_0;
                    this.LZZHINZU = this.Z_0;
                    this.R = 0;
                    this.RE4 = this.Z_0;
                    this.SONSTB = this.Z_0;
                    this.STERBE = this.Z_0;
                    this.STKL = 0;
                    this.VBEZ = this.Z_0;
                    this.VBEZM = this.Z_0;
                    this.VBEZS = this.Z_0;
                    this.VBS = this.Z_0;
                    this.VJAHR = 0;
                    this.VKAPA = this.Z_0;
                    this.VMT = this.Z_0;
                    this.ZKF = this.Z_0;
                    this.ZMVB = 0;
                };
                /**
                 * Setter for all input parameters with type Big.
                 *
                 * @param {String} name Variable name to set.
                 * @param {Big} value Value to set.
                 */
                Lohnsteuer2008Big.prototype.setBig = function (name, value) {
                    switch (name) {
                        case 'JFREIB':
                            this.JFREIB = value;
                            break;
                        case 'JHINZU':
                            this.JHINZU = value;
                            break;
                        case 'JRE4':
                            this.JRE4 = value;
                            break;
                        case 'JVBEZ':
                            this.JVBEZ = value;
                            break;
                        case 'LZZFREIB':
                            this.LZZFREIB = value;
                            break;
                        case 'LZZHINZU':
                            this.LZZHINZU = value;
                            break;
                        case 'RE4':
                            this.RE4 = value;
                            break;
                        case 'SONSTB':
                            this.SONSTB = value;
                            break;
                        case 'STERBE':
                            this.STERBE = value;
                            break;
                        case 'VBEZ':
                            this.VBEZ = value;
                            break;
                        case 'VBEZM':
                            this.VBEZM = value;
                            break;
                        case 'VBEZS':
                            this.VBEZS = value;
                            break;
                        case 'VBS':
                            this.VBS = value;
                            break;
                        case 'VKAPA':
                            this.VKAPA = value;
                            break;
                        case 'VMT':
                            this.VMT = value;
                            break;
                        case 'ZKF':
                            this.ZKF = value;
                            break;
                        default:
                            throw new Error("Unknown Big parameter " + name);
                    }
                };
                /**
                 * Setter for all input parameters with type number.
                 *
                 * @param {String} name Variable name to set.
                 * @param {Big} value Value to set.
                 */
                Lohnsteuer2008Big.prototype.setNumber = function (name, value) {
                    switch (name) {
                        case 'AJAHR':
                            this.AJAHR = value;
                            break;
                        case 'ALTER1':
                            this.ALTER1 = value;
                            break;
                        case 'KRV':
                            this.KRV = value;
                            break;
                        case 'LZZ':
                            this.LZZ = value;
                            break;
                        case 'R':
                            this.R = value;
                            break;
                        case 'STKL':
                            this.STKL = value;
                            break;
                        case 'VJAHR':
                            this.VJAHR = value;
                            break;
                        case 'ZMVB':
                            this.ZMVB = value;
                            break;
                        default:
                            throw new Error("Unknown number parameter " + name);
                    }
                };
                /**
                 * Getter for all output parameters with type Big.
                 *
                 * @param {String} name Variable name to get.
                 */
                Lohnsteuer2008Big.prototype.getBig = function (name) {
                    switch (name) {
                        case 'BK': return this.BK;
                        case 'BKS': return this.BKS;
                        case 'BKV': return this.BKV;
                        case 'LSTLZZ': return this.LSTLZZ;
                        case 'SOLZLZZ': return this.SOLZLZZ;
                        case 'SOLZS': return this.SOLZS;
                        case 'SOLZV': return this.SOLZV;
                        case 'STS': return this.STS;
                        case 'STV': return this.STV;
                        default:
                            throw new Error("Unknown Big parameter " + name);
                    }
                };
                /**
                 * Getter for all output parameters with type number.
                 *
                 * @param {String} name Variable name to get.
                 */
                Lohnsteuer2008Big.prototype.getNumber = function (name) {
                    switch (name) {
                        default:
                            throw new Error("Unknown number parameter " + name);
                    }
                };
                /**
                 * Get all input names.
                 */
                Lohnsteuer2008Big.prototype.getInputs = function () {
                    return [
                        "AJAHR", "ALTER1", "JFREIB", "JHINZU", "JRE4", "JVBEZ", "KRV", "LZZ", "LZZFREIB", "LZZHINZU", "R", "RE4", "SONSTB", "STERBE", "STKL", "VBEZ", "VBEZM", "VBEZS", "VBS", "VJAHR", "VKAPA", "VMT", "ZKF", "ZMVB",
                    ];
                };
                /**
                 * Get all output names.
                 */
                Lohnsteuer2008Big.prototype.getOutputs = function () {
                    return [
                        "BK", "BKS", "BKV", "LSTLZZ", "SOLZLZZ", "SOLZS", "SOLZV", "STS", "STV",
                    ];
                };
                return Lohnsteuer2008Big;
            }());
            exports_1("Lohnsteuer2008Big", Lohnsteuer2008Big);
        }
    };
});
//# sourceMappingURL=Lohnsteuer2008Big.js.map