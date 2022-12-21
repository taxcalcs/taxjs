/**
* Steuerberechnungsklasse.
*
* Generiert aus Pseudocode von: <a href="https://www.bmf-steuerrechner.de">bmf-steuerrechner</a>
*
*/
var Lohnsteuer2008Big = /** @class */ (function () {
    function Lohnsteuer2008Big() {
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
        this.ZAHL700 = new Big(700);
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
            this.ZTABFB = (this.ZTABFB.add(this.KFB)).round(2, Big.roundDown);
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
            this.ZRE4J = this.RE4.div(this.ZAHL100).round(2, Big.roundDown);
            this.ZVBEZJ = this.VBEZ.div(this.ZAHL100).round(2, Big.roundDown);
            this.JLFREIB = this.LZZFREIB.div(this.ZAHL100).round(2, Big.roundDown);
            this.JLHINZU = this.LZZHINZU.div(this.ZAHL100).round(2, Big.roundDown);
        }
        else {
            if (this.LZZ == 2) {
                this.ZRE4J = (this.RE4.mul(this.ZAHL12)).div(this.ZAHL100).round(2, Big.roundDown);
                this.ZVBEZJ = (this.VBEZ.mul(this.ZAHL12)).div(this.ZAHL100).round(2, Big.roundDown);
                this.JLFREIB = (this.LZZFREIB.mul(this.ZAHL12)).div(this.ZAHL100).round(2, Big.roundDown);
                this.JLHINZU = (this.LZZHINZU.mul(this.ZAHL12)).div(this.ZAHL100).round(2, Big.roundDown);
            }
            else {
                if (this.LZZ == 3) {
                    this.ZRE4J = (this.RE4.mul(this.ZAHL360)).div(this.ZAHL700).round(2, Big.roundDown);
                    this.ZVBEZJ = (this.VBEZ.mul(this.ZAHL360)).div(this.ZAHL700).round(2, Big.roundDown);
                    this.JLFREIB = (this.LZZFREIB.mul(this.ZAHL360)).div(this.ZAHL700).round(2, Big.roundDown);
                    this.JLHINZU = (this.LZZHINZU.mul(this.ZAHL360)).div(this.ZAHL700).round(2, Big.roundDown);
                }
                else {
                    this.ZRE4J = (this.RE4.mul(this.ZAHL360)).div(this.ZAHL100).round(2, Big.roundDown);
                    this.ZVBEZJ = (this.VBEZ.mul(this.ZAHL360)).div(this.ZAHL100).round(2, Big.roundDown);
                    this.JLFREIB = (this.LZZFREIB.mul(this.ZAHL360)).div(this.ZAHL100).round(2, Big.roundDown);
                    this.JLHINZU = (this.LZZHINZU.mul(this.ZAHL360)).div(this.ZAHL100).round(2, Big.roundDown);
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
                this.VBEZB = (this.VBEZM.mul(new Big(this.ZMVB))).add(this.VBEZS);
                /**  Achtung! Rechengenauigkeit Division?  */
                this.HFVB = this.TAB2[this.J].div(this.ZAHL12).mul(new Big(this.ZMVB));
                this.FVBZ = this.TAB3[this.J].div(this.ZAHL12).mul(new Big(this.ZMVB)).round(0, Big.roundUp);
            }
            else {
                this.VBEZB = ((this.VBEZM.mul(this.ZAHL12)).add(this.VBEZS)).round(2, Big.roundDown);
                this.HFVB = this.TAB2[this.J];
                this.FVBZ = this.TAB3[this.J];
            }
            this.FVB = ((this.VBEZB.mul(this.TAB1[this.J]))).div(this.ZAHL100).round(2, Big.roundUp);
            if (this.FVB.cmp(this.HFVB) == 1) {
                this.FVB = this.HFVB;
            }
            this.VBEZBSO = this.STERBE.add(this.VKAPA);
            this.FVBSO = (this.FVB.add((this.VBEZBSO.mul(this.TAB1[this.J])).div(this.ZAHL100))).round(2, Big.roundUp);
            if (this.FVBSO.cmp(this.TAB2[this.J]) == 1) {
                this.FVBSO = this.TAB2[this.J];
            }
            this.HFVBZSO = (((this.VBEZB.add(this.VBEZBSO)).div(this.ZAHL100)).sub(this.FVBSO)).round(2, Big.roundDown);
            if ((this.TAB3[3]).cmp(this.HFVBZSO) == 1) {
                this.FVBZSO = this.HFVBZSO.round(0, Big.roundUp);
            }
            else {
                this.FVBZSO = this.TAB3[this.J];
            }
            this.HFVBZ = ((this.VBEZB.div(this.ZAHL100)).sub(this.FVB)).round(2, Big.roundDown);
            if (this.FVBZ.cmp(this.HFVBZ) == 1) {
                this.FVBZ = this.HFVBZ.round(0, Big.roundUp);
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
            this.ALTE = (this.BMG.mul(this.TAB4[this.K])).round(2, Big.roundUp);
            this.HBALTE = this.TAB5[this.K];
            if (this.ALTE.cmp(this.HBALTE) == 1) {
                this.ALTE = this.HBALTE;
            }
        }
    };
    /**  Ermittlung des Jahresarbeitslohns nach Abzug der FreibetrÃ¤ge nach Â§ 39 b Abs. 2 Satz 3 und 4 EStG, PAP Seite 15  */
    Lohnsteuer2008Big.prototype.MRE4ABZ = function () {
        this.ZRE4 = (this.ZRE4J.sub(this.FVB).sub(this.ALTE).sub(this.JLFREIB).add(this.JLHINZU)).round(2, Big.roundDown);
        if (this.ZRE4.cmp(this.Z_0) == -1) {
            this.ZRE4 = this.Z_0;
        }
        this.ZRE4VP = (this.ZRE4J.sub(this.FVB).sub(this.ALTE)).round(2, Big.roundDown);
        if (this.ZRE4VP.cmp(this.Z_0) == -1) {
            this.ZRE4VP = this.Z_0;
        }
        this.ZVBEZ = (this.ZVBEZJ.sub(this.FVB)).round(2, Big.roundDown);
        if (this.ZVBEZ.cmp(this.Z_0) == -1) {
            this.ZVBEZ = this.Z_0;
        }
    };
    /**  Ermittlung der festen TabellenfreibetrÃ¤ge (ohne Vorsorgepauschale), PAP Seite 16  */
    Lohnsteuer2008Big.prototype.MZTABFB = function () {
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
        else {
            this.FVBZ = new Big(0);
            this.FVBZSO = new Big(0);
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
        this.ZTABFB = (this.EFA.add(this.ANP).add(this.SAP).add(this.FVBZ)).round(2, Big.roundDown);
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
            this.ZVE = (this.ZRE4.sub(this.ZTABFB).sub(this.VSP)).round(2, Big.roundDown);
        }
        else {
            if (this.KENNVMT == 1) {
                this.ZVE = this.ZRE4OSO.sub(this.ZTABFBOSO).add(this.ZRE4VMT).sub(this.VSP).round(2, Big.roundDown);
            }
            else {
                this.ZVE = (((this.ZRE4.sub(this.ZTABFB)).div(this.ZAHL5)).sub(this.VSP)).round(2, Big.roundDown);
            }
        }
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
    /**  Vorsorgepauschale (Â§ 39b Abs. 2 Satz 6 Nr 3 EStG) nach AlterseinkÃ¼nftegesetz, PAP Seite 18  */
    Lohnsteuer2008Big.prototype.UPEVP = function () {
        /**  Achtung: Er wird davon ausgegangen, dass
          a) die Rentenversicherungsbemessungsgrenze sich 2008 auf 63.600 erhÃ¶ht und
          b) der Beitragsatz zur Rentenversicherung gegenÃ¼ber 2007 unverÃ¤ndert bleibt  */
        if (this.KRV > 0) {
            this.VSP1 = this.Z_0;
        }
        else {
            if (this.ZRE4VP.cmp(new Big(63600)) == 1) {
                this.ZRE4VP = new Big(63600);
            }
            this.VSP1 = (this.ZRE4VP.mul(new Big(0.32))).round(2, Big.roundDown);
            this.VSP1 = (this.VSP1.mul(new Big(0.0995))).round(2, Big.roundDown);
        }
        this.VSP2 = (this.ZRE4VP.mul(new Big(0.11))).round(2, Big.roundDown);
        this.VHB = (new Big(this.KZTAB).mul(new Big(1500))).round(2, Big.roundDown);
        if (this.VSP2.cmp(this.VHB) == 1) {
            this.VSP2 = this.VHB;
        }
        this.VSPN = (this.VSP1.add(this.VSP2)).round(0, Big.roundUp);
        this.MVSP();
        if (this.VSPN.cmp(this.VSP) == 1) {
            this.VSP = this.VSPN.round(2, Big.roundDown);
        }
    };
    /**  Vorsorgepauschale (Â§39b Abs. 2 Satz 6 Nr 3 EStG) Vergleichsberechnung fuer Guenstigerpruefung, PAP Seite 19  */
    Lohnsteuer2008Big.prototype.MVSP = function () {
        this.VSPO = (this.ZRE4VP.mul(new Big(0.2))).round(2, Big.roundDown);
        this.VSPVOR = (new Big(this.KZTAB).mul(new Big(3068))).round(2, Big.roundDown);
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
    /**  Vorsorgepauschale, PAP Seite 20  */
    Lohnsteuer2008Big.prototype.UMVSP = function () {
        this.VSPVOR = (this.VSPVOR.sub(this.ZRE4VP.mul(new Big(0.16)))).round(2, Big.roundDown);
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
    /**  Lohnsteuer fuer die Steuerklassen V und VI (Â§ 39b Abs. 2 Satz 8 EStG), PAP Seite 21  */
    Lohnsteuer2008Big.prototype.MST5_6 = function () {
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
    /**  Lohnsteuer fuer die Steuerklassen V und VI (Â§ 39b Abs. 2 Satz 8 EStG), PAP Seite 21  */
    Lohnsteuer2008Big.prototype.UP5_6 = function () {
        this.X = (this.ZX.mul(new Big(1.25))).round(2, Big.roundDown);
        this.UPTAB07();
        this.ST1 = this.ST;
        this.X = (this.ZX.mul(new Big(0.75))).round(2, Big.roundDown);
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
    /**  Solidaritaetszuschlag, PAP Seite 22  */
    Lohnsteuer2008Big.prototype.MSOLZ = function () {
        this.SOLZFREI = new Big(972 * this.KZTAB);
        if (this.JBMG.cmp(this.SOLZFREI) == 1) {
            this.SOLZJ = (this.JBMG.mul(new Big(5.5))).div(this.ZAHL100).round(2, Big.roundDown);
            this.SOLZMIN = (this.JBMG.sub(this.SOLZFREI)).mul(new Big(20)).div(this.ZAHL100).round(2, Big.roundDown);
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
    /**  Anteil von Jahresbetraegen fuer einen LZZ (Â§ 39b Abs. 2 Satz 10 EStG), PAP Seite 23  */
    Lohnsteuer2008Big.prototype.UPANTEIL = function () {
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
            this.ZRE4J = ((this.JRE4.add(this.SONSTB)).div(this.ZAHL100)).round(2, Big.roundDown);
            this.ZVBEZJ = ((this.JVBEZ.add(this.VBS)).div(this.ZAHL100)).round(2, Big.roundDown);
            this.MRE4SONST();
            this.MLSTJAHR();
            this.LSTSO = this.ST.mul(this.ZAHL100);
            this.STS = this.LSTSO.sub(this.LSTOSO);
            if (this.STS.cmp(this.Z_0) == -1) {
                this.STS = this.Z_0;
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
            this.ZRE4J = ((this.JRE4.add(this.SONSTB).add(this.VMT).add(this.VKAPA)).div(this.ZAHL100)).round(2, Big.roundDown);
            this.ZVBEZJ = ((this.JVBEZ.add(this.VBS).add(this.VKAPA)).div(this.ZAHL100)).round(2, Big.roundDown);
            this.MRE4SONST();
            this.MLSTJAHR();
            this.LST3 = this.ST.mul(this.ZAHL100);
            this.ZTABFB = (this.ZTABFB.sub(this.FVBZ).add(this.FVBZOSO)).round(2, Big.roundDown);
            this.KENNVMT = 1;
            if ((this.JRE4.add(this.SONSTB).sub(this.JFREIB).add(this.JHINZU)).cmp(this.Z_0) == -1) {
                this.KENNVMT = 2;
                this.MLSTJAHR();
                this.LST2 = this.ST.mul(this.ZAHL100);
                this.STV = this.LST2.mul(this.ZAHL5);
            }
            else {
                this.ZRE4VMT = (((this.VMT.div(this.ZAHL100)).add(this.VKAPA.div(this.ZAHL100)).sub(this.ZTABFB).add(this.ZTABFBOSO)).div(this.ZAHL5)).round(2, Big.roundDown);
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
    /**  Sonderberechnung ohne sonstige BezÃ¼ge fÃ¼r Berechnung bei sonstigen BezÃ¼gen oder VergÃ¼tung fÃ¼r mehrjÃ¤hrige TÃ¤tigkeit, PAP Seite 26  */
    Lohnsteuer2008Big.prototype.MOSONST = function () {
        this.ZRE4J = (this.JRE4.div(this.ZAHL100)).round(2, Big.roundDown);
        this.ZVBEZJ = (this.JVBEZ.div(this.ZAHL100)).round(2, Big.roundDown);
        this.JLFREIB = this.JFREIB.div(this.ZAHL100).round(2, Big.roundDown);
        this.JLHINZU = this.JHINZU.div(this.ZAHL100).round(2, Big.roundDown);
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
        this.JFREIB = this.JHINZU = this.JRE4 = this.JVBEZ = this.LZZFREIB = this.LZZHINZU = this.RE4 = this.SONSTB = this.STERBE = this.VBEZ = this.VBEZM = this.VBEZS = this.VBS = this.VKAPA = this.VMT = this.ZKF = this.Z_0;
        this.AJAHR = this.ALTER1 = this.KRV = this.LZZ = this.R = this.STKL = this.VJAHR = this.ZMVB = 0;
    };
    // not realy clean, but for ts compiler
    Lohnsteuer2008Big.prototype.isBigInput = function (name, value) {
        return value instanceof Big;
    };
    /**
     * Setter for Big or number input parameters.
     *
     * @param {string} name Variable name to set.
     * @param {number} value Value to set.
     */
    Lohnsteuer2008Big.prototype.set = function (name, value) {
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
    Lohnsteuer2008Big.prototype.get = function (name) {
        if (this.hasOwnProperty(name)) {
            return this[name];
        }
        throw new Error("Unknown parameter " + name);
    };
    /**
     * Get all fields with types.
     */
    Lohnsteuer2008Big.prototype.getDirectory = function () {
        return Lohnsteuer2008Big.typeDirectory;
    };
    /**
     * Converts a value (number or Big) in the correct type (number or Big).
     *
     * @param {string} name the name of the value
     * @param {TaxJsValueType} value the value to convert
     */
    Lohnsteuer2008Big.prototype.toType = function (name, value) {
        var info = Lohnsteuer2008Big.typeDirectory[name];
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
    Lohnsteuer2008Big._n = "number";
    Lohnsteuer2008Big._b = "Big";
    Lohnsteuer2008Big._i = "input";
    Lohnsteuer2008Big._o = "output";
    Lohnsteuer2008Big._s = "STANDARD";
    Lohnsteuer2008Big._d = "DBA";
    Lohnsteuer2008Big.typeDirectory = {
        "AJAHR": { type: Lohnsteuer2008Big._n, direction: Lohnsteuer2008Big._i }, "ALTER1": { type: Lohnsteuer2008Big._n, direction: Lohnsteuer2008Big._i }, "JFREIB": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "JHINZU": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "JRE4": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "JVBEZ": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "KRV": { type: Lohnsteuer2008Big._n, direction: Lohnsteuer2008Big._i }, "LZZ": { type: Lohnsteuer2008Big._n, direction: Lohnsteuer2008Big._i }, "LZZFREIB": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "LZZHINZU": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "R": { type: Lohnsteuer2008Big._n, direction: Lohnsteuer2008Big._i }, "RE4": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "SONSTB": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "STERBE": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "STKL": { type: Lohnsteuer2008Big._n, direction: Lohnsteuer2008Big._i }, "VBEZ": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "VBEZM": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "VBEZS": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "VBS": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "VJAHR": { type: Lohnsteuer2008Big._n, direction: Lohnsteuer2008Big._i }, "VKAPA": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "VMT": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "ZKF": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._i }, "ZMVB": { type: Lohnsteuer2008Big._n, direction: Lohnsteuer2008Big._i }, "BK": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._o, group: Lohnsteuer2008Big._s }, "BKS": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._o, group: Lohnsteuer2008Big._s }, "BKV": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._o, group: Lohnsteuer2008Big._s }, "LSTLZZ": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._o, group: Lohnsteuer2008Big._s }, "SOLZLZZ": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._o, group: Lohnsteuer2008Big._s }, "SOLZS": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._o, group: Lohnsteuer2008Big._s }, "SOLZV": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._o, group: Lohnsteuer2008Big._s }, "STS": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._o, group: Lohnsteuer2008Big._s }, "STV": { type: Lohnsteuer2008Big._b, direction: Lohnsteuer2008Big._o, group: Lohnsteuer2008Big._s },
    };
    return Lohnsteuer2008Big;
}());
//# sourceMappingURL=Lohnsteuer2008Big.js.map