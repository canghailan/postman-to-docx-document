Sub SetStyle()

For Each Table In ActiveDocument.Tables
    Table.Borders.InsideLineStyle = wdLineStyleSingle
    Table.Borders.OutsideLineStyle = wdLineStyleSingle
Next
End Sub

