
$(function() {
    $( "#slider-me" ).slider({
        orientation: "vertical",
        range: "min",
        min: 1970,
        max: 2015,
        value: 1971,
        change: function( event, ui ) {
            var sResult="";
            var iYear = $("#slider-me").slider("option", "value");
            var iMax =  $("#slider-me").slider("option", "max");
            var iMin =  $("#slider-me").slider("option", "min");

            if (iYear==iMax) iYear=iMin+1;
            $("#slider-me-description").text("");

            if (iYear>1973 && iYear < 1993){
              $("#slider-me").slider('value', 1993);
              return;  
            }
            if (iYear>1993 && iYear < 1996){
              $("#slider-me").slider('value', 1996);
              return;  
            }
            if (iYear==1997){
              $("#slider-me").slider('value', 1998);
              return;  
            }
            if (iYear>2001 && iYear < 2003){
              $("#slider-me").slider('value', 2003);
              return;  
            }

            $( "#slider-me-title" ).text( iYear);
            
            var g = $("#map-container > g");
            $("g").children("path");

            // Green - Victory!
            // LightGreen - Court ruling granting benefits to marriage equality
            // Red - Negative effects on marriage equality
            // Purple - Negative & Postive events during this year.

            //Reset background to grey
            resetMap();

            //By year
            var s1971 = "<p>Same sex marriages not recognized in any state.</p>"

            var s1972 = '<p>The U.S. Supreme Court dismisses Baker v. Nelson (291 Minnesota 310, 191 N.W.2d 185 (1971)), one of three cases brought by same-sex couples, challenging the denial of marriage. </p>';
            var s1973 = '<p>Maryland becomes the first state to pass a statute banning marriage between same-sex couples when it includes in its Family Law Code a line reading, &ldquo;Only a marriage between a man and a woman is valid in this State.&rdquo;</p>';
            s1973 += '<p>The Kentucky Court of Appeals rules in &#39Jones v. Hallahan&#39 that same-sex couples may not marry. The case comes after Marjorie Jones and Tracy Knight applied for and were denied a marriage license in Jefferson County, KY. </p>';

            var s1974 = '<p>The Court of Appeals of Washington denies the case of Seattle residents John Singer and Paul Barwick, who challenged the denial of the freedom to marry to same-sex couples.</p>';
            var s1993 = '<p>The Hawaii Supreme Court rules in &#39Baehr v. Lewin&#39 that denying marriage to same-sex couples violates the Equal Protection Clause of the Hawaii Constitution.</p>';
            var s1996 = '<p>President Bill Clinton signs the so-called Defense of Marriage Act (DOMA) into law.</p>';
            s1996 += 'Following the world&#39s first-ever trial on the freedom to marry, led by co-counsel Dan Foley and Evan Wolfson, Judge Kevin Chang in Hawaii rules that the state did not have a legitimate reason for depriving same-sex couples of the freedom to marry.';
            var s1998 = '<p>Anti-gay forces succeed in amending the Hawaii Constitution so as to prevent the courts from ending the exclusion of same-sex couples; under the Amendment, only the legislature can now cure that discrimination, notwithstanding the Equal Protection Clause.</p>';
            var s1999 = '<p>California becomes the first state to create a domestic partnership statute, allowing same-sex couples to receive some, but not all, of the protections afforded by marriage.</p>';
            s1999 += '<p>The Hawaii Supreme Court, bound by the new restrictive constitutional amendment, dismisses the couples&#39 challenge and leaves standing the denial of marriage.</p>';
            s1999 += '<p>The Vermont Supreme Court rules in &#39Baker v. State of Vermont&#39 (a case brought by Gay & Lesbian Advocates & Defenders) that same-sex couples must be treated equally to different-sex married couples.</p>';
            var s2000 = '<p>Anti-gay forces in Nebraska push through the discriminatory Initiative Measure 416 at the ballot, constitutionally prohibiting the state from respecting any form of family status or recognition for same-sex couples.</p>';

            var s2003 = '<p>Massachusetts Superior Judicial Court rules ban on same sex marriage unconstitutional</p>';
            var s2004 = '<p>Massachuessetts legislature passes law allowing same sex marriage.</p>'; 
            s2004 += '<p>Anti-gay forces in eleven states, marshaled by Karl Rove, push through constitutional amendments to deny same-sex couples the freedom to marry (Arkansas, Georgia, Kentucky, Michigan, Mississippi, Montana, North Dakota,Ohio, Oklahoma, Oregon, Utah)</p>';

            var s2005 = '<p>The Louisiana Supreme Court reinstates a hurtful anti-family ban on marriage between same-sex couples, bringing the number of states with constitutional amendments against marriage to 17.</p>';
            s2005 += '<p>Connecticut Governor Jodi Rell signs a civil union bill into law, affording same-sex couples some – but not all – of the projections that marriage provides.</p>';
            s2005 += '<p>The California legislature becomes the first state legislature to pass a freedom to marry bill. The landmark bill is vetoed soon after passage by Governor Arnold Schwarzenegger.</p>';
            s2005 += '<p>The discriminatory constitutional amendment Proposition 2 is passed in Texas, constitutionally excluding same-sex couples from marriage. Same-sex couples in Kansas are denied any form of family recognition by a similar anti-gay constitutional amendment.</p>';

            var s2006 = '<p>The New Jersey Supreme Court issues a unanimous ruling in &#39Lewis v. Harris&#39 (a case brought by Lambda Legal) that same-sex couples are entitled to all state-level spousal rights and responsibilities.</p>';
            s2006 += '<p>Anti-gay activists continue their anti-marriage, anti-family agenda by passing constitutional amendments denying same-sex couples the freedom to marry in seven more states – Colorado, Idaho, South Carolina, South Dakota, Tennessee, Virginia, and Wisconsin.</p>';
            s2006 += '<p>Arizona becomes the first state to reject an anti-gay marriage amendment at the ballot.</p>';

            var s2007 = "";
            s2007+='<p>Washington state Governor Christine Gregoire signs a domestic partnership bill into law. In the weeks that follow, Oregon Governor Ted Kulongski and New Hampshire Governor John Lynch also sign a domestic partnership law and a civil union law, respectively.</p>';

            var s2008 = "";
            s2008+='<p>The California Supreme Court determines in "In Re: Marriage Cases," a case brought by Lambda Legal, the American Civil Liberties Union, and the National Center for Lesbian Rights, that a state statute excluding same-sex couples from marriage is unconstitutional.</p>';
            s2008 += '<p>Maryland Governor Martin O’Malley signs into law a domestic partnership bill allowing same-sex couples in Maryland some – but not all – of the benefits that marriage affords.</p>';
            s2008 += '<p>Anti-gay forces in California push through Proposition 8, an anti-gay constitutional amendment that strips away same-sex couples’ freedom to marry and restricts marriage to different-sex couples. Similar amendments are passed in Florida and Arizona.</p>';

            var s2009 = '<p>The Iowa Supreme Court hands down a unanimous decision in favor of the freedom to marry in &#39Varnum v. Brien,&#39 a case brought by Lambda Legal.</p>';
            s2009 += '<p>Vermont pushes past civil union and embraces the freedom to marry when the state legislature overwhelmingly votes to override a veto from Governor Jim Douglas.</p>';
            s2009 += '<p>Maine Governor John Baldacci signs a freedom to marry bill into law previously approved by the state Senate and House of Representatives.</p>';
            s2009 += '<p>The California Supreme Court rules, in a case brought by Lambda Legal, the ACLU and NCLR, that, notwithstanding Prop 8, marriages between same-sex couples that occurred in the four months between June and November remain valid.</p>';
            s2009 += '<p>Nevada approves a broad domestic partnership bill after the state legislature overrides a veto from the state’s governor. Later that summer, Wisconsin also approves a less expansive domestic partnership bill.</p>';
            s2009 += '<p>New Hampshire Governor John Lynch signs into law a freedom to marry bill approved by the state Senate and House of Representatives.</p>';
            s2009 += '<p>Anti-gay forces in Maine push through an anti-gay ballot measure to overturn the freedom to marry in the state and restrict marriage to different-sex couples.</p>';
            s2009 += '<p>District of Columbia Mayor Adrian Fenty signs a freedom to marry bill into law after it passes by a large majority of City Council members.</p>';

            var s2010 = '<p>A U.S. District Court rules in &#39Gill v. Office of Personnel Management&#39 (a case brought by Gay & Lesbian Advocates & Defenders) and &#39Commonwealth of Massachusetts v. United States Department of Health and Human Services&#39 (a case brought by MA Attorney General Martha Coakley) that DOMA’s Section 3, which restricts marriage to different-sex couples, is unconstitutional.</p>';
            s2010 += '<p>The U.S. District Court of Northern California declares, in a case brought by the American Foundation for Equal Rights, that Proposition 8 violates the U.S. Constitution’s due process and equal protection clauses, finding it unconstitutional to exclude same-sex couples from marriage.</p>';


            var s2011 = '<p>Illinois Governor Pat Quinn signs a civil union bill into law after it is approved by the state Senate and House of Representatives. Later in 2011, civil union laws are also approved in Hawaii, Delaware, and Rhode Island.</p>';
            //s2011 += '<p>Vermont pushes past civil union and embraces the freedom to marry when the state legislature overwhelmingly votes to override a veto from Governor Jim Douglas.</p>';
            s2011 += '<p>President Barack Obama and Attorney General Eric Holder declare that because it is indefensible under the constitutional command of equal protection, the Administration will no longer defend the so-called Defense of Marriage Act.</p>';
            s2011 += '<p>The Respect for Marriage Act, the bill that would overturn the so-called Defense of Marriage Act, is introduced.</p>';
            s2011 += '<p>The U.S. Bankruptcy Court for the Central District of California in Los Angeles releases an opinion finding Section 3 of the so-called Defense of Marriage Act unconstitutional.</p>';
            s2011 += '<p>New York Governor Andrew Cuomo signs a freedom to marry bill into law, more than doubling the number of Americans living in a state with the freedom to marry.</p>';


            var s2012 = '<p>The Maine Freedom to Marry Coalition delivers more than 105,000 signatures to the Secretary of State to place a citizen’s initiative on the November 2012 ballot. The measure would allow same-sex couples to receive a marriage license while also protecting religious freedom.</p>';
            s2012 += '<p>The U.S. Ninth Circuit Court of Appeals upholds the August 4 ruling that found that Proposition 8 in California violates the U.S. Constitution.</p>';
            s2012 += '<p>Washington Governor Christine Gregoire signs the freedom to marry into law after the state Senate and House approve it.</p>';
            s2012 += '<p>The New Jersey legislature approves the freedom to marry, but soon after, New Jersey Governor Chris Christie vetoes the bill.</p>';
            s2012 += '<p>U.S. District Court Judge Jeffrey White rules in &#39Golinski v. Office of Personnel Management&#39 (a case brought by Lambda Legal), declaring that DOMA’s Section 3, which restricts marriage to different-sex couples, is unconstitutional.</p>';
            s2012 += '<p>Maryland Governor Martin O’Malley signs the freedom to marry into law after it passes out of the state Senate and House.</p>';
            s2012 += '<p>Voters in North Carolina approve a constitutional amendment that bans all forms of relationship recognition for same-sex couples.</p>';
            s2012 += '<p>President Barack Obama becomes the first sitting president in the United States to publicly announce support for the freedom to marry.</p>';
            s2012 += '<p>The National Association for the Advancement of Colored People (NAACP) joins the growing ranks of organizations who support the freedom to marry when the board approves a resolution supporting marriage for same-sex couples.</p>';
            s2012 += '<p>The U.S. First Circuit Court of Appeals finds the Defense of Marriage Act unconstitutional in two cases: &#39Gill v. Office of Personnel Management&#39 (brought by Gay & Lesbian Advocates & Defenders) and &#39Massachusetts v. United States Department of Health and Human Services&#39 (brought by MA Attorney General Martha Coakley).</p>';
            s2012 += '<p>The full U.S. Court of Appeals for the Ninth Circuit denies anti-gay activists&#39 petition for an en banc rehearing of the Proposition 8 case.</p>';
            s2012 += '<p>In Connecticut, U.S. District Court Judge Vanessa Bryant finds the Defense of Marriage Act unconstitutional in &#39Pedersen v. Office of Personnel Management.&#39</p>';
            s2012 += '<p>The Democratic Party becomes the first major U.S. political party in history to officially endorse the freedom to marry in their national party platform when the platform is ratified at the Democratic National Convention.</p>';
            s2012 += '<p>The freedom to marry triumphs in Maine, Maryland, Minnesota, and Washington.</p>';
            s2012 += '<p>The U.S. Supreme Court announces that it will hear two marriage cases at the federal level - Windsor v. United States, which the ACLU filed to take on DOMA, and Hollingsworth v. Perry, which the American Foundation for Equal Rights filed to challenge California&#39s Proposition 8.</p>';

            var s2013 = '<p>The United States Supreme Court hears oral arguments in two landmark marriage cases: Hollingsworth v. Perry, the challenge to California&#39s Proposition 8, and Windsor v. United States, a challenge to the so-called Defense of Marriage Act.</p>';
            s2013 += '<p>For the first time ever, a majority of United States Senators publicly support the freedom to marry. The landmark 51st announcement (from FL Senator Bill Nelson) ended a two-week period where over a dozen U.S. Senators - including two Republicans - announced that they support ending the exclusion of same-sex couples from marriage.</p>';
            s2013 += '<p>Rhode Island Governor Lincoln Chafee signs a freedom to marry bill into law hours after it is approved by the Rhode Island Senate. The bill had already been approved overwhelmingly by the RI House.</p>';
            s2013 += '<p>Delaware Governor Jack Markell signs a freedom to marry bill into law immediately after it is approved by the Delaware Senate.</p>';
            s2013 += '<p>Minnesota Governor Mark Dayton signs a freedom to marry bill into law after both houses of the Minnesota legislature overwhelmingly approve the marriage bill.</p>';
            s2013 += '<p>The Supreme Court of the United States announces its decisions in two landmark cases dealing with the freedom to marry. The Supreme Court’s historic decisions will dramatically improve the lives of same-sex couples across the country, allowing many couples the ability to protect each other and their families.</p>';
            s2013 += '<p>Same-sex couples begin marrying at midnight in New Jersey after a court ruling declaring the freedom to marry across the state. Just hours after weddings begin in NJ, Gov. Chris Christie drops his appeal, halting efforts to restrict marriage to different-sex couples.</p>';
            s2013 += '<p>Governor Neil Abercrombie signed the freedom to marry into law in Hawaii after a three-week Special Session where legislators discussed why marriage matters to same-sex couples and their families.</p>';
            s2013 += '<p>Governor Pat Quinn signed the freedom to marry into law in Illinois after it was approved earlier in the year by the Illinois Senate and House.</p>';
            s2013 += '<p>The New Mexico Supreme Court issues a landmark decision in a lawsuit brought by the National Center for Lesbian Rights seeking clarification on laws regarding the freedom to marry in the state. The ruling affirmed the freedom to marry in every county in the state, making New Mexico the 17th state where same-sex couples can marry.</p>';
            s2013 += '<p>U.S. District Court Judge Robert J. Shelby issues a ruling declaring that laws prohibiting same-sex couples from marrying in Utah are unconstitutional, conflicting with the U.S. Constitution&#39s guarantees of equal protection and due process under the law.</p>';

            var s2014 = '<p>U.S. District Court Judge Terence Kern issues a ruling in favor of the freedom to marry in Oklahoma, a tremendous step forward for same-sex couples in the state.</p>';
            s2014 += '<p>U.S. District Court Judge John G. Heyburn II (appointed by President George H.W. Bush) issues a ruling in Kentucky ordering the state to respect the marriages of same-sex couples legally performed in other states.</p>';
            s2014 += '<p>U.S. District Judge Arenda L. Wright Allen issues a ruling in Virginia in favor of the freedom to marry for same-sex couples.</p>';
            s2014 += '<p>U.S. District Judge Orlando Garcia issues a ruling in Texas in favor of the freedom to marry for same-sex couples.</p>';
            s2014 += '<p>U.S. District Judge Bernard Friedman issues a ruling in Michigan in favor of the freedom to marry for same-sex couples, following a two-week trial on why marriage matters. The ruling takes effect immediately, and for nearly 24 hours, same-sex couples have the freedom to marry in Michigan.</p>';
            s2014 += '<p>U.S. District Judge Timothy Black issues a ruling in Ohio declaring that the state must respect the marriages of same-sex couples legally performed in other states.</p>';
            s2014 += '<p>Arkansas Circuit Judge Chris Piazza issues a ruling in Arkansas striking down the state&#39s ban on same-sex couples from marrying. The decision takes effect immediately, and over the next week, more than 400 same-sex couples receive marriage licenses in Arkansas.</p>';
            s2014 += '<p>U.S. Magistrate Candy Dale issues a ruling in Idaho striking down the state&#39s ban on same-sex couples from marrying.</p>';
            s2014 += '<p>U.S. District Judge Michael McShane issues a ruling in Oregon striking down the state&#39s ban on marriage for same-sex couples.</p>';
            s2014 += '<p>U.S. District Judge John E. Jones III strikes down Pennsylvania&#39s ban on marriage for same-sex couples.</p>';
            s2014 += '<p>U.S. District Judge Barbara Crabb strikes down Wisconsin&#39s ban on marriage for same-sex couples.</p>';
            s2014 += '<p>The U.S. Court of Appeals for the 10th Circuit upholds the trial court ruling in Utah&#39s Kitchen v. Herbert, agreeing that banning same-sex couples from marrying is unconstitutional.</p>';
            s2014 += '<p>U.S. District Judge Richard L. Young strikes down anti-marriage laws in Indiana.</p>';
            s2014 += '<p>District Court Judge Scott Crabtree in Colorado state court strikes down the state&#39s law denying the freedom to marry to same-sex couples. The decision is stayed before it can take effect. Just weeks later, a federal judge in Colorado rules in a separate case that denying the freedom to marry is unconstitutional.</p>';
            s2014 += '<p>Chief Circuit Judge Luis Garcia rules in Florida state court that Florida&#39s law denying same-sex couples the freedom to marry is unconstitutional.</p>';
            s2014 += '<p>The United States Court of Appeals for the 4th Circuit becomes the second federal appellate court to rule in favor of the freedom to marry when it upholds the trial court ruling in Virginia&#39s Bostic v. Schaefer.</p>';
            s2014 += '<p>In a unanimous victory, the U.S. Court of Appeals for the 7th Circuit becomes the third federal appellate court to affirm the freedom to marry when it upholds the trial court ruling in three Indiana marriage cases and Wisconsin&#39s Wolf v. Walker.</p>';
            s2014 += '<p>The United States Supreme Court denies review in five different marriage cases, clearing the way for lower court rulings to stand and same-sex couples to finally have the freedom to marry in Indiana, Oklahoma, Utah, Virginia and Wisconsin.</p>';
            s2014 += '<p>The United States Court of Appeals for the 9th Circuit becomes the fourth federal appellate court to rule in favor of the freedom to marry when it rules in favor of same-sex couples in marriage cases from Idaho and Nevada.</p>';
            s2014 += '<p>Following the 4th Circuit ruling taking effect, officials in two states allow the freedom to marry to take effect.</p>';
            s2014 += '<p>Following the 9th Circuit ruling taking effect, federal judges in Arizona and Wyoming struck down marriage bans, and state officials quickly after announced that they would not appeal, allowing the rulings to take effect once and for all.</p>';
            s2014 += '<p>The 6th Circuit broke with the unanimous chorus of circuit courts by upholding marriage discrimination and reversing 6 lower court rulings in favor of the freedom to marry.</p>';
            s2014 += '<p>After a wave of several limited pro-marriage rulings in Missouri, U.S. District Court Judge Ortrie D. Smith rules in favor of the freedom to marry in a federal case from Missouri, striking down the state&#39s marriage ban.</p>';

            if (iYear <= 1971){
              $("#slider-me-description").html(s1971);              
            }
            if (iYear >= 1972){
              iTemp = getIdFromState("Minnesota");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              $("#slider-me-description").html(s1972);              
            }

            if (iYear >= 1973) {
              iTemp=getIdFromState("Maryland");
              // console.log(iTemp);
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");

              iTemp=getIdFromState("Kentucky");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");

              $("#slider-me-description").html(s1973);                            
            }

            if (iYear >= 1974) {
              iTemp=getIdFromState("Washington");

              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              $("#slider-me-description").html(s1974);                            
            }

            if (iYear >= 1993) {
              iTemp=getIdFromState("Hawaii");

              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              $("#slider-me-description").html(s1993);                            
            }

            if (iYear >= 1996) {
              iTemp=getIdFromState("Washington");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");

              iTemp=getIdFromState("Hawaii");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              $("#slider-me-description").html(s1996);                            
            }

            if (iYear >= 1998) {
              iTemp=getIdFromState("Hawaii");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              $("#slider-me-description").html(s1998);                            
            }

            if (iYear >= 1999) {
              iTemp=getIdFromState("California");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");

              iTemp=getIdFromState("Hawaii");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");

              iTemp=getIdFromState("Vermont");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              
              $("#slider-me-description").html(s1999);                            
            }

            if (iYear >= 2000) {
              iTemp=getIdFromState("Nebraska");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              
              $("#slider-me-description").html(s2000);                            
            }

            if (iYear >= 2003){
              iTemp=getIdFromState("Massachusetts");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              $("#slider-me-description").html(s2003);
            }

            if (iYear >= 2004){
              iTemp2 = getIdFromState("Massachusetts");
              $("#map-container").children("g").children("path").eq(iTemp2).css("fill","green");

              iTemp2 = getIdFromState("Arkansas");
              $("#map-container").children("g").children("path").eq(iTemp2).css("fill","red");
              iTemp2 = getIdFromState("Georgia");
              $("#map-container").children("g").children("path").eq(iTemp2).css("fill","red");
              iTemp2 = getIdFromState("Kentucky");
              $("#map-container").children("g").children("path").eq(iTemp2).css("fill","red");
              iTemp2 = getIdFromState("Michigan");
              $("#map-container").children("g").children("path").eq(iTemp2).css("fill","red");
              iTemp2 = getIdFromState("North Dakota");
              $("#map-container").children("g").children("path").eq(iTemp2).css("fill","red");
              iTemp2 = getIdFromState("Mississippi");
              $("#map-container").children("g").children("path").eq(iTemp2).css("fill","red");
              iTemp2 = getIdFromState("Montana");
              $("#map-container").children("g").children("path").eq(iTemp2).css("fill","red");
              iTemp2 = getIdFromState("Oregon");
              $("#map-container").children("g").children("path").eq(iTemp2).css("fill","red");
              iTemp2 = getIdFromState("Oklahoma");
              $("#map-container").children("g").children("path").eq(iTemp2).css("fill","red");
              iTemp2 = getIdFromState("Ohio");
              $("#map-container").children("g").children("path").eq(iTemp2).css("fill","red");
              iTemp2 = getIdFromState("Utah");
              $("#map-container").children("g").children("path").eq(iTemp2).css("fill","red");
              // console.log(s2004);
              $("#slider-me-description").html(s2004);
            }
            
            if (iYear >= 2005){
              iTemp=getIdFromState("Louisiana");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              iTemp=getIdFromState("Connecticut");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              iTemp=getIdFromState("California");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              iTemp=getIdFromState("Texas");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              iTemp=getIdFromState("Kansas");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              
              $("#slider-me-description").html(s2005);              
            }   

            if (iYear >= 2006){
              iTemp=getIdFromState("New Jersey");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");

              iTemp=getIdFromState("Colorado");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              iTemp=getIdFromState("Idaho");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              iTemp=getIdFromState("South Carolina");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              iTemp=getIdFromState("South Dakota");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");              
              iTemp=getIdFromState("Tennessee");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              iTemp=getIdFromState("Virginia");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              iTemp=getIdFromState("Wisconsin");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              
              iTemp=getIdFromState("Arizona");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              
              $("#slider-me-description").html(s2006);              
            }

            if (iYear >= 2007){
              iTemp=getIdFromState("Washington");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");

              iTemp=getIdFromState("Oregon");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");

              iTemp=getIdFromState("New Hampshire");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              
              $("#slider-me-description").html(s2007);              
            }

            if (iYear >= 2008){
              iTemp=getIdFromState("Arizona");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");

              iTemp=getIdFromState("Florida");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");

              iTemp=getIdFromState("California");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","purple");

              iTemp=getIdFromState("Maryland");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");

              iTemp=getIdFromState("Connecticut");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              
              $("#slider-me-description").html(s2008);              

              iTemp=getIdFromState("Vermont");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","purple");            }
            
            if (iYear >= 2009){
              iTemp=getIdFromState("Iowa");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");

              iTemp=getIdFromState("Vermont");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");

              iTemp=getIdFromState("Maine");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","purple");

              iTemp=getIdFromState("California");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              
              iTemp=getIdFromState("Nevada");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");

              iTemp=getIdFromState("Wisconsin");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              
              iTemp=getIdFromState("New Hampshire");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
                            
              iTemp=getIdFromState("District of Columbia");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              
              $("#slider-me-description").html(s2009);              
            }

            if (iYear >= 2010){
              iTemp=getIdFromState("District of Columbia");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");

              iTemp=getIdFromState("Vermont");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");

              iTemp=getIdFromState("California");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              
              $("#slider-me-description").html(s2010);              
            }

            if (iYear >= 2011){
              iTemp=getIdFromState("Illinois");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              iTemp=getIdFromState("Hawaii");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              iTemp=getIdFromState("Delaware");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              iTemp=getIdFromState("Rhode Island");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              iTemp=getIdFromState("California");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              iTemp=getIdFromState("New York");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");

              
              $("#slider-me-description").html(s2011);              
            }

            if (iYear >= 2012){
              iTemp=getIdFromState("Maine");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("California");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              iTemp=getIdFromState("Connecticut");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","lightgreen");
              
              iTemp=getIdFromState("Washington");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Maryland");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Minnesota");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              
              iTemp=getIdFromState("New Jersey");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              iTemp=getIdFromState("North Carolina");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","red");
              
              $("#slider-me-description").html(s2012);              
            }

            if (iYear >= 2013){              
              iTemp=getIdFromState("Rhode Island");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Delaware");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Minnesota");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("New Jersey");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Hawaii");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Illinois");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("New Mexico");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Utah");

              $("#slider-me-description").html(s2013);              
            }

            if (iYear >= 2014){
              iTemp=getIdFromState("Oklahoma");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Kentucky");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Virginia");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Texas");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Michigan");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Ohio");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Arkansas");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Idaho");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Oregon");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Pennsylvania");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Wisconsin");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Indiana");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Colorado");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Florida");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("West Virginia");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("North Carolina");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Arizona");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Wyoming");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");
              iTemp=getIdFromState("Missouri");
              $("#map-container").children("g").children("path").eq(iTemp).css("fill","green");

              
              $("#slider-me-description").html(s2014);              
            }
        }
    });
  });

